/\*\*

- DataTablePagination Usage Examples
-
- The improved pagination component now intelligently hides elements based on context:
  \*/

// Example 1: Table with page size options and selected rows
<DataTable
data={data}
columns={columns}
pageSizeOptions={[10, 20, 50, 100]} // ✅ Dropdown will show
// When rows are selected ✅ "X of Y row(s) selected" will show
/>

// Example 2: Table without page size options
<DataTable
data={data}
columns={columns}
// No pageSizeOptions ❌ Dropdown will be hidden
/>

// Example 3: Table with no data
<DataTable
data={[]} // Empty data
columns={columns}
pageSizeOptions={[10, 20]} // Options provided but no data
// ❌ Entire pagination will be hidden (no rows, no point in pagination)
/>

// Example 4: Table with single page
<DataTable
data={smallDataset} // Less than page size
columns={columns}
pageSizeOptions={[10, 20]}
// ✅ Page size dropdown shows
// ❌ Page navigation buttons hidden (only 1 page)
// ❌ "Page X of Y" hidden (only 1 page)
/>

/\*\*

- Smart Display Logic:
-
- 1.  Row Selection Info:
- - Shows: When rows are actually selected (> 0)
- - Hides: When no rows selected (0)
-
- 2.  Page Size Dropdown:
- - Shows: When pageSizeOptions provided AND data exists
- - Hides: When no pageSizeOptions OR no data
-
- 3.  Page Navigation:
- - Shows: When multiple pages exist (pageCount > 1)
- - Hides: When single page or no data
-
- 4.  Entire Pagination:
- - Shows: When data exists OR page size options provided
- - Hides: When no data AND no page size options
-
- 5.  Layout Adjustment:
- - justify-between: When row selection info is shown
- - justify-end: When no row selection info
    \*/
