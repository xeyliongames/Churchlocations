import { VStack, Box, Table } from "@chakra-ui/react";
import { AggregateStats } from "./utils/fetchData";

export function DataTable({ stats }: { stats: AggregateStats | null }) {
  return (
    <VStack gap={4} alignItems="flex-end" width="100%">
      {stats && (
        <Box>
          <Table.Root variant="outline" fontSize="14px">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Metric</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="right">Value</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell fontWeight="medium">Total Roof Area</Table.Cell>
                <Table.Cell textAlign="right">
                  {formatNumber(stats.TotalRoofArea)} sq ft
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="medium">Usable Roof Area</Table.Cell>
                <Table.Cell textAlign="right">
                  {formatNumber(stats.UsableRoofArea)} sq ft
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="medium">
                  Average Percent Usable
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {formatNumber(stats.PercentUsable)}%
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="medium">
                  Total Potential System Size
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {formatNumber(stats.PotentialSystemSize)} kW
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="medium">
                  Total Projected Annual kWh
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {formatNumber(stats.ProjectedAnnualKWH)} kWh
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell fontWeight="medium">
                  Total Projected Annual Savings
                </Table.Cell>
                <Table.Cell textAlign="right">
                  ${formatNumber(stats.ProjectedAnnualSavings)}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </VStack>
  );
}

const formatNumber = (num: number) => {
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};
