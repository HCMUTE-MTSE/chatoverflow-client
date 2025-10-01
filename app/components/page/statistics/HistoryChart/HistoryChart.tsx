import * as React from 'react';

export interface HistoryDataPoint {
  date: string; // Format: YYYY-MM-DD
  questions: number;
  answers: number;
  blogs: number;
  total: number;
}

export interface HistoryChartProps {
  data: HistoryDataPoint[];
  className?: string;
  onYearChange?: (year: number) => void;
}

export default function HistoryChart({
  data,
  className = '',
  onYearChange,
}: HistoryChartProps) {
  const [hoveredDay, setHoveredDay] = React.useState<HistoryDataPoint | null>(
    null
  );
  const [selectedYear, setSelectedYear] = React.useState<number>(
    new Date().getFullYear()
  );

  // Generate year options (current year and previous 4 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Handle year change
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    if (onYearChange) {
      onYearChange(year);
    }
  };

  // Generate grid data for GitHub-style chart (full year)
  const generateGridData = (): HistoryDataPoint[] => {
    const gridData: HistoryDataPoint[] = [];
    const startDate = new Date(selectedYear, 0, 1); // January 1st of selected year
    const endDate = new Date(selectedYear, 11, 31); // December 31st of selected year

    // Filter data to only include dates from the selected year
    const yearData = data.filter((d) => {
      const date = new Date(d.date);
      return date.getFullYear() === selectedYear;
    });

    // Create a map of existing data for quick lookup
    const dataMap = new Map(yearData.map((d) => [d.date, d]));

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Use local date formatting to avoid timezone issues
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const existingData = dataMap.get(dateStr);

      gridData.push({
        date: dateStr,
        questions: existingData?.questions || 0,
        answers: existingData?.answers || 0,
        blogs: existingData?.blogs || 0,
        total:
          (existingData?.questions || 0) +
          (existingData?.answers || 0) +
          (existingData?.blogs || 0),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return gridData;
  };

  const gridData = generateGridData();

  // Calculate intensity levels (0-4 like GitHub)
  const maxActivity = Math.max(...gridData.map((d) => d.total));
  const getIntensity = (total: number): number => {
    if (total === 0) return 0;
    if (maxActivity === 0) return 0;
    const percentage = total / maxActivity;
    if (percentage <= 0.25) return 1;
    if (percentage <= 0.5) return 2;
    if (percentage <= 0.75) return 3;
    return 4;
  };

  const getIntensityColor = (intensity: number): string => {
    switch (intensity) {
      case 0:
        return '#161B22'; // Dark gray (no activity)
      case 1:
        return '#0E4429'; // Light green
      case 2:
        return '#006D32'; // Medium green
      case 3:
        return '#26A641'; // Green
      case 4:
        return '#39D353'; // Bright green
      default:
        return '#161B22';
    }
  };

  // Group data by weeks (starting from Sunday = 0)
  const groupByWeeks = (data: HistoryDataPoint[]) => {
    const weeks: HistoryDataPoint[][] = [];
    let currentWeek: HistoryDataPoint[] = [];

    data.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay(); // 0 = Sunday

      // If this is the first day, pad the week with empty days
      if (index === 0 && dayOfWeek > 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({
            date: '',
            questions: 0,
            answers: 0,
            blogs: 0,
            total: 0,
          });
        }
      }

      currentWeek.push(day);

      // If it's Saturday (6) or the last day, complete the week
      if (dayOfWeek === 6 || index === data.length - 1) {
        // Pad the end of the week if needed
        while (currentWeek.length < 7) {
          currentWeek.push({
            date: '',
            questions: 0,
            answers: 0,
            blogs: 0,
            total: 0,
          });
        }
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    return weeks;
  };

  // Generate month labels for the weeks
  const getMonthLabels = (weeks: HistoryDataPoint[][]) => {
    const monthLabels: { label: string; weekIndex: number }[] = [];
    const processedMonths = new Set<string>();

    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.find((day) => day.date);
      if (firstValidDay) {
        const date = new Date(firstValidDay.date);
        const monthLabel = date.toLocaleDateString('en-US', { month: 'short' });
        const monthYear = `${monthLabel}-${date.getFullYear()}`;

        // Only add if we haven't seen this month-year combination AND
        // there's enough space from the last label (at least 3 weeks)
        if (!processedMonths.has(monthYear)) {
          const lastLabelIndex =
            monthLabels.length > 0
              ? monthLabels[monthLabels.length - 1].weekIndex
              : -4;
          if (weekIndex - lastLabelIndex >= 3 || monthLabels.length === 0) {
            monthLabels.push({ label: monthLabel, weekIndex });
            processedMonths.add(monthYear);
          }
        }
      }
    });

    return monthLabels;
  };

  const weeks = groupByWeeks(gridData);
  const monthLabels = getMonthLabels(weeks);

  if (!data || data.length === 0) {
    return (
      <div
        className={`p-6 bg-gray-800 rounded-lg border border-gray-700 ${className}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Activity History</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-400">No activity data available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 bg-gray-800 rounded-lg border border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Activity History</h3>

        {/* Year Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(parseInt(e.target.value))}
            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-sm"></div>
            <span className="text-xs text-gray-300">Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
            <span className="text-xs text-gray-300">Answers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
            <span className="text-xs text-gray-300">Blogs</span>
          </div>
        </div>

        {/* Activity level legend */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: getIntensityColor(level) }}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">More</span>
        </div>
      </div>

      {/* GitHub-style contribution grid */}
      <div className="relative bg-gray-900 rounded p-3">
        {/* Month labels */}
        <div className="flex mb-1">
          <div className="w-8"></div> {/* Spacer for day labels */}
          <div className="flex gap-1 relative">
            {monthLabels.map(({ label, weekIndex }) => (
              <div
                key={`${label}-${weekIndex}`}
                className="text-xs text-gray-400 absolute"
                style={{ left: `${weekIndex * 16}px`, minWidth: '20px' }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Main grid container */}
        <div className="flex mt-4">
          {/* Day labels column */}
          <div className="flex flex-col gap-1 mr-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
              (day, index) => (
                <div
                  key={index}
                  className="text-xs text-gray-400 h-3 flex items-center w-6"
                >
                  {day}
                </div>
              )
            )}
          </div>

          {/* Grid container */}
          <div className="flex gap-1 overflow-x-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-1 hover:ring-orange-400"
                    style={{
                      backgroundColor: day.date
                        ? getIntensityColor(getIntensity(day.total))
                        : 'transparent',
                    }}
                    onMouseEnter={() => day.date && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div
            className="absolute bg-gray-700 border border-gray-600 rounded p-3 pointer-events-none z-10 shadow-lg"
            style={{
              left: '50%',
              top: '-100px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-sm text-white font-semibold mb-1">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="text-xs text-amber-400">
              Questions: {hoveredDay.questions}
            </div>
            <div className="text-xs text-green-400">
              Answers: {hoveredDay.answers}
            </div>
            <div className="text-xs text-blue-400">
              Blogs: {hoveredDay.blogs}
            </div>
            <div className="text-xs text-white font-semibold mt-1 pt-1 border-t border-gray-600">
              Total: {hoveredDay.total}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
