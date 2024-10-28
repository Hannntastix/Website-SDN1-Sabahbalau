import * as React from "react";

const Card = ({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
        {...props}
    />
);

const CardHeader = ({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`flex flex-col space-y-1.5 p-6 ${className}`}
        {...props}
    />
);

const CardTitle = ({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={`font-semibold leading-none tracking-tight ${className}`}
        {...props}
    />
);

const CardDescription = ({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={`text-sm text-muted-foreground ${className}`}
        {...props}
    />
);

const CardContent = ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
);

const CardFooter = ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
