const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-5 bg-gray-300 rounded w-1/4 mt-4"></div>

    <div className="flex justify-between items-center">
      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
    </div>

    <div className="border rounded-lg p-4 grid grid-cols-2 gap-4">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="h-6 bg-gray-300 rounded"></div>
        ))}
    </div>
    <div className="w-full border rounded-lg">
      <div className="flex justify-end gap-3 p-4">
        <div className="h-6 bg-gray-300 rounded w-10"></div>
        <div className="h-6 bg-gray-300 rounded w-10"></div>
      </div>

      <table className="w-full border-t">
        <thead>
          <tr>
            {Array(11)
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
            .map((_, index) => (
              <tr key={index} className="border-t">
                {Array(11)
                  .fill(0)
                  .map((_, colIndex) => (
                    <td key={colIndex} className="p-2">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center gap-4 p-4">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-10"></div>
        <div className="h-4 bg-gray-300 rounded w-10"></div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
