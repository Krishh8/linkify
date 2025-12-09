function URLModelSkeleton() {
    return (
        <div className="flex flex-col rounded-lg shadow-gray-900 p-2 shadow-md bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
            {/* Header skeleton */}
            <div className="p-4 pb-2 border-b border-gray-700">
                <div className="flex justify-between items-center">
                    <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Content skeleton */}
            <div className="grow p-4 space-y-4">
                <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-12 w-full bg-gray-700 rounded-md animate-pulse"></div>
                </div>
                <div className="space-y-1">
                    <div className="h-4 w-20 bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-12 flex-1 bg-gray-700 rounded-md animate-pulse"></div>
                        <div className="h-12 w-12 bg-gray-700 rounded-md animate-pulse"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                    <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Footer skeleton */}
            <div className="flex justify-between gap-2 p-2 border-t border-gray-700">
                <div className="flex-1 h-10 bg-gray-700 rounded-md animate-pulse"></div>
                <div className="flex-1 h-10 bg-gray-700 rounded-md animate-pulse"></div>
            </div>
        </div>
    );
}

export default URLModelSkeleton;

