const ImportSkeletonLoader = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-300 rounded w-1/4 mt-4"></div>
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      <div className="h-8 bg-gray-300 rounded w-32"></div>
    </div>

    <div className="border rounded-lg w-full">
      <div className="flex justify-end items-center gap-3 pr-10 py-3">
        <div className="h-8 bg-gray-300 rounded w-8"></div>
        <div className="h-8 bg-gray-300 rounded w-8"></div>
        <div className="h-8 bg-gray-300 rounded w-8"></div>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <th key={index} className="p-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill(0)
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {Array(8)
                  .fill(0)
                  .map((_, colIndex) => (
                    <td key={colIndex} className="p-4">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center gap-4 pr-10 py-4 border-t">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-10"></div>
        <div className="h-4 bg-gray-300 rounded w-10"></div>
      </div>
    </div>
  </div>
);

export default ImportSkeletonLoader;
