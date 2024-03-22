export default function Loading() {
    return (
        <>
            <div className="space-y-4 animate-pulse">
                <div className="flex items-center">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-1 items-center space-x-2">
                            <div className="p-5 w-full max-w-sm bg-muted-foreground/10 dark:bg-border rounded"></div>
                            <div className="min-w-32 rounded bg-muted-foreground/10 dark:bg-border p-5"></div>
                        </div>
                        <div className="flex gap-2 items-center ml-auto">
                            <div className="p-5 w-full min-w-28 bg-muted-foreground/10 dark:bg-border rounded"></div>
                            <div className="min-w-44 rounded bg-muted-foreground/10 dark:bg-border p-5"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-muted-foreground/10 dark:bg-border rounded min-h-96"></div>
                <div className="flex items-center justify-between">
                    <div className="p-5 w-full max-w-60 bg-muted-foreground/10 dark:bg-border rounded"></div>
                    <div className="flex items-center space-x-2">
                        <div className="min-w-80 rounded bg-muted-foreground/10 dark:bg-border p-5"></div>
                        <div className="min-w-52 rounded bg-muted-foreground/10 dark:bg-border p-5"></div>
                    </div>
                </div>
            </div>
        </>
    )
}