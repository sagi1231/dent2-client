interface DimensionValue {
  value: string | number;
}

interface MetricValue {
  value: number;
}

interface ReportItem {
  dimensionValues: DimensionValue[];
  metricValues: MetricValue[];
}
export interface MetricHeader {
  name: string;
  type: string;
}

export interface ReportResponse {
  dimensionHeaders: { name: string }[];
  metricHeaders: MetricHeader[];
  rows: ReportItem[];
  rowCount: number;
  metadata: {
    currencyCode: string;
    timeZone: string;
  };
  kind: string;
}
