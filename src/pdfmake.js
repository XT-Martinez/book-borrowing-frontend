import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DateTimeHelper from './helpers/DateTime';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {

   makeStudentTable(collections, studentReport) {
      let body = [];
      let widths = ['*', '*', 28];
      let table = {body, widths};

      // Header Definition
      let studentReportHeader = [
         {text: 'Grade Level', style: 'tableHeader'},
         {text: 'Section', style: 'tableHeader'},
         {text: 'Head Count', style: 'tableHeader'}
      ];
      // Add Dynamic Columns to the Header
      collections.forEach(e => {
         studentReportHeader.push({text: e.prefix, style: 'tableHeader'});
         widths.push(24);
      });

      studentReportHeader.push({text: 'Total vol.', style: 'tableHeader'});
      widths.push(28);

      body.push(studentReportHeader);

      // Grade Level Row Definition
      studentReport.forEach(e => {

         let studentReportGradeLevelRow = [
            {text: e.name, style: ['tableHeader', 'tableTotal']},
            {text: '', style: ['tableHeader', 'tableTotal']},
            {text: e.totals.borrower_count, style: ['tableHeader', 'tableTotal']}
         ];

         // Add Dynamic Columns to the Row
         collections.forEach(c => {
            studentReportGradeLevelRow.push({text: e.totals[c.prefix], style: ['tableHeader', 'tableTotal']});
         });

         // Add subtotal value
         studentReportGradeLevelRow.push({text: e.totals.sub_total, style: ['tableHeader', 'tableTotal']});
         // Add grade level row to the table
         body.push(studentReportGradeLevelRow);

         // Section Row Definition
         e.sections.forEach(s => {
            let studentReportSectionRow = [
               '',
               {text: s.name, style: 'tableRow'},
               {text: s.totals.borrower_count, style: 'tableRow'}
            ];

            // Add Dynamic Columns to the Row
            collections.forEach(c => {
               studentReportSectionRow.push({text: s.totals[c.prefix], style: 'tableRow'});
            });

            // Add subtotal value
            studentReportSectionRow.push({text: s.totals.sub_total, style: 'tableRow'});
            // Add grade level row to the table
            body.push(studentReportSectionRow);

         });
      });

      return table;
   },

   makeDepartmentTable(collections, personnelReport, departmentReport) {
      let body = [];
      let widths = ['*', 28];
      let table = {body, widths};

      // Header Definition
      let header = [
         {text: 'Department', style: 'tableHeader'},
         {text: 'Head Count', style: 'tableHeader'}
      ];
      // Add Dynamic Columns to the Header
      collections.forEach(e => {
         header.push({text: e.prefix, style: 'tableHeader'});
         widths.push(24);
      });

      header.push({text: 'Total vol.', style: 'tableHeader'});
      widths.push(28);

      body.push(header);

      // Grade Level Row Definition
      departmentReport.departmentTotals.forEach(e => {

         let rowStyle = e.is_personnel ? 'tableHeader' : 'tableRow';
         let departmentRow = [
            {text: e.name, style: [rowStyle, 'tableLabel']},
            {text: e.totals.borrower_count, style: rowStyle}
         ];


         // Add Dynamic Columns to the Row
         collections.forEach(c => {
            departmentRow.push({text: e.totals[c.prefix], style: rowStyle});
         });

         // Add subtotal value
         departmentRow.push({text: e.totals.sub_total, style: rowStyle});
         // Add grade level row to the table
         body.push(departmentRow);

      });

      // Faculty Totals
      let facultyTotalRow = [
         {text: 'Faculty', style: ['tableLabel']},
         {text: personnelReport.facultyTotals.borrower_count, style: 'tableRow'}
      ];

      // Add Dynamic Columns to the Row
      collections.forEach(c => {
         facultyTotalRow.push({text: personnelReport.facultyTotals[c.prefix], style: 'tableRow'});
      });

      // Add subtotal value
      facultyTotalRow.push({text: personnelReport.facultyTotals.sub_total, style: 'tableRow'});
      // Add grade level row to the table
      body.push(facultyTotalRow);

      // Generate rows for faculty personnel group
      personnelReport.personnelGroupTotals
      .filter(e => e.is_faculty)
      .forEach(e => {
         // Faculty Totals
         let facultyTotalRow = [
            {text: e.name, style: ['tableLabel', 'tableSubLabel']},
            {text: e.totals.borrower_count, style: 'tableRow'}
         ];

         // Add Dynamic Columns to the Row
         collections.forEach(c => {
            facultyTotalRow.push({text: e.totals[c.prefix], style: 'tableRow'});
         });

         // Add subtotal value
         facultyTotalRow.push({text: e.totals.sub_total, style: 'tableRow'});
         // Add grade level row to the table
         body.push(facultyTotalRow);
      });

      // Generate rows for non-faculty personnel group
      personnelReport.personnelGroupTotals
      .filter(e => !e.is_faculty)
      .forEach(e => {
         // Faculty Totals
         let facultyTotalRow = [
            {text: e.name, style: 'tableLabel'},
            {text: e.totals.borrower_count, style: 'tableRow'}
         ];

         // Add Dynamic Columns to the Row
         collections.forEach(c => {
            facultyTotalRow.push({text: e.totals[c.prefix], style: 'tableRow'});
         });

         // Add subtotal value
         facultyTotalRow.push({text: e.totals.sub_total, style: 'tableRow'});
         // Add grade level row to the table
         body.push(facultyTotalRow);
      });

      let grandTotalRow = [
         {text: 'Grand Total', style: ['tableHeader', 'tableLabel', 'tableTotal']},
         {text: departmentReport.grandTotals.borrower_count, style: ['tableHeader', 'tableTotal']}
      ];

      // Add Dynamic Columns to the Row
      collections.forEach(c => {
         grandTotalRow.push({text: departmentReport.grandTotals[c.prefix], style: ['tableHeader', 'tableTotal']});
      });

      // Add subtotal value
      grandTotalRow.push({text: departmentReport.grandTotals.sub_total, style: ['tableHeader', 'tableTotal']});
      // Add grade level row to the table
      body.push(grandTotalRow);

      return table;
   },

   makeFilterDescription(filter) {
      let content = [ ];

      let tableBody = [];

      switch(filter.filter_type) {
         case 1:
            content.push({text: 'Filter by Month/Year', style: 'h1'});
            let month = DateTimeHelper.
               getMonths()
               .filter(e => e.id === filter.month)[0].name;
            tableBody.push([
               {text: 'Month: ', style: 'h2'},
               {text: month, bold: true}
            ]);
            tableBody.push([
               {text: 'Year: ', style: 'h2'},
               {text: filter.year, bold: true}
            ]);
            break;
         case 2:
            content.push({text: 'Filter by Date Range', style: 'h1'});
            tableBody.push([
               {text: 'Start Date: ', style: 'h2'},
               {text: filter.start_date, bold: true}
            ]);
            tableBody.push([
               {text: 'End Date: ', style: 'h2'},
               {text: filter.end_date, bold: true}
            ]);
            break;
      }

      let table = {
         // style: '',
         table: {
            body: tableBody,
         },
         layout: 'noBorders'
      }

      content.push(table);
      return content;
   },

   printReport(collections, studentReport, personnelReport, departmentReport, filter) {
      
      let studentTable = this.makeStudentTable(collections, studentReport);
      let departmentTable = this.makeDepartmentTable(collections, personnelReport, departmentReport);

      let definition = {
         content: [
            this.makeFilterDescription(filter),
            // {canvas: [{ type: 'line', x1: 0, y1: 10, x2: 540-10, y2: 10, lineWidth: 0.5 }]},
            '\n',
            {text: 'Borrowing Statistics for Students', style: 'h1'},
            {
               table: {
                  headerRows: 1,
                  widths: studentTable.widths,
                  body: studentTable.body,
               },
               fontSize: 10
            },
            '\n',
            {text: 'Borrowing Statistics by Department', style: 'h1'},
            {
               table: {
                  headerRows: 1,
                  widths: departmentTable.widths,
                  body: departmentTable.body,
               },
               fontSize: 10
            }
         ],
         
         styles: {
            tableHeader: {
               alignment: 'center',
               bold: true,
               fillColor: "#DDDDDD"
            },

            tableRow: {
               alignment: 'center',
               bold: false
            },

            tableTotal: {
               fillColor: "#FFF194"
            },

            tableLabel: {
               alignment: 'left',
               bold: true
            },

            tableSubLabel: {
               margin: [15, 0, 0, 0],
               bold: false
            },

            h1: {
               fontSize: 14,
               bold:true,
               margin: [0, 10, 0, 10]
            }
         },

         pageSize: 'LETTER',
         // pageOrientation: 'landscape',

         info: {
            title: 'Borrowing Statistics',
            author: 'Joyce Ann R. Cababat'
         }
      }

      // console.log(studentReportTable);

      return pdfMake.createPdf(definition);
   }

};