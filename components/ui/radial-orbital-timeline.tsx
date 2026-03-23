"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
    timelineData,
}: RadialOrbitalTimelineProps) {
    const [mounted, setMounted] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    // Refs for animation loop
    const rotationAngleRef = useRef<number>(0);
    const requestRef = useRef<number | null>(null);
    const autoRotateRef = useRef(autoRotate);
    const expandedItemsRef = useRef(expandedItems);

    // Sync state to refs for the animation loop
    useEffect(() => {
        autoRotateRef.current = autoRotate;
    }, [autoRotate]);

    useEffect(() => {
        expandedItemsRef.current = expandedItems;
    }, [expandedItems]);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);

                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    const updateNodesDOM = () => {
        const total = timelineData.length;
        timelineData.forEach((item, index) => {
            const el = nodeRefs.current[item.id];
            if (!el) return;

            const angle = ((index / total) * 360 + rotationAngleRef.current) % 360;
            const radius = 200;
            const radian = (angle * Math.PI) / 180;

            const x = radius * Math.cos(radian) + centerOffset.x;
            const y = radius * Math.sin(radian) + centerOffset.y;

            const zIndex = Math.round(100 + 50 * Math.cos(radian));
            const opacity = Math.max(
                0.4,
                Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
            );

            const isExpanded = expandedItemsRef.current[item.id];

            el.style.transform = `translate(${x}px, ${y}px)`;
            if (!isExpanded) {
                el.style.zIndex = zIndex.toString();
                el.style.opacity = opacity.toString();
            } else {
                el.style.zIndex = "200";
                el.style.opacity = "1";
            }
        });
    };

    const animate = () => {
        if (autoRotateRef.current) {
            rotationAngleRef.current = (rotationAngleRef.current + 0.2) % 360;
            updateNodesDOM();
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (mounted) {
            // Initial position
            updateNodesDOM();
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [mounted]);

    const centerViewOnNode = (nodeId: number) => {
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        if (nodeIndex === -1) return;
        
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;

        rotationAngleRef.current = (270 - targetAngle + 360) % 360;
        updateNodesDOM();
    };

    const getRelatedItems = (itemId: number): number[] => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status: TimelineItem["status"]): string => {
        switch (status) {
            case "completed":
                return "text-white bg-black border-white";
            case "in-progress":
                return "text-black bg-white border-black";
            case "pending":
                return "text-white bg-black/40 border-white/50";
            default:
                return "text-white bg-black/40 border-white/50";
        }
    };

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
                        <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
                        <div
                            className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
                    </div>

                    <div className="absolute w-96 h-96 rounded-full border border-white/10"></div>

                    {mounted && timelineData.map((item) => {
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                ref={(el: HTMLDivElement | null) => { 
                                    if (el) nodeRefs.current[item.id] = el; 
                                }}
                                className="absolute cursor-pointer will-change-transform"
                                style={{
                                    transition: isExpanded ? "all 0.5s ease" : "none"
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                <div
                                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""
                                        }`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                                        width: `${item.energy * 0.5 + 40}px`,
                                        height: `${item.energy * 0.5 + 40}px`,
                                        left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                        top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                    }}
                                ></div>

                                <div
                                    className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isExpanded
                                            ? "bg-white text-black"
                                            : isRelated
                                                ? "bg-white/50 text-black"
                                                : "bg-black text-white"
                                        }
                  border-2 
                  ${isExpanded
                                            ? "border-white shadow-lg shadow-white/30"
                                            : isRelated
                                                ? "border-white animate-pulse"
                                                : "border-white/40"
                                        }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                                >
                                    <Icon size={16} />
                                </div>

                                <div
                                    className={`
                  absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-white/90"}
                `}
                                >
                                    {item.title}
                                </div>

                                {isExpanded && (
                                    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 md:w-72 bg-black/95 backdrop-blur-xl border border-white/40 shadow-2xl shadow-white/20 overflow-visible z-50">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/80"></div>
                                        <CardHeader className="pb-2 pt-5">
                                            <div className="flex justify-between items-center mb-1">
                                                <Badge
                                                    className={`px-2 text-xs font-bold ${getStatusStyles(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status === "completed"
                                                        ? "TAMAMLANDI"
                                                        : item.status === "in-progress"
                                                            ? "DEVAM EDİYOR"
                                                            : "BEKLEMEDE"}
                                                </Badge>
                                                <span className="text-xs font-mono text-white/90 font-medium tracking-wide">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <CardTitle className="text-base mt-2 text-white font-bold tracking-wide">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-white/95 leading-relaxed font-medium">
                                            <p>{item.content}</p>

                                            <div className="mt-5 pt-4 border-t border-white/20">
                                                <div className="flex justify-between items-center text-xs mb-1.5">
                                                    <span className="flex items-center text-white/90 font-bold">
                                                        <Zap size={14} className="mr-1.5 text-yellow-400" />
                                                        Etki Puanı
                                                    </span>
                                                    <span className="font-mono text-white font-bold">{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                                                        style={{ width: `${item.energy}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {item.relatedIds.length > 0 && (
                                                <div className="mt-5 pt-4 border-t border-white/20">
                                                    <div className="flex items-center mb-3">
                                                        <Link size={12} className="text-white/90 mr-1.5" />
                                                        <h4 className="text-xs uppercase tracking-wider font-bold text-white/90">
                                                            Bağlı Özellikler
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relatedItem = timelineData.find(
                                                                (i) => i.id === relatedId
                                                            );
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="flex items-center h-7 px-3 py-0 text-xs rounded bg-white/10 hover:bg-white/20 border-white/30 text-white hover:text-white transition-all font-bold"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    {relatedItem?.title}
                                                                    <ArrowRight
                                                                        size={12}
                                                                        className="ml-1.5 text-white/90"
                                                                    />
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
