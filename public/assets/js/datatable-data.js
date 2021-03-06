$(document).ready(function () {

    // jQuery datatable customized code 
    window.callThejQueryDataTable = () => {

        console.log('jQuery data table is loaded.......');
        
        'use strict';
        $(document).ready(function () {
            $('#example').DataTable({
                //DataTable Options
            });
            $('#listingTable').DataTable({
                // scrollY: '100vh',
                // scrollCollapse: true,
                // paging: true,
                // pageLength: 20,
                dom: 'Bfrtip',
                buttons: ['print', 'csv'],
                order: [],
            });
            $('#example-multi').DataTable({
                //DataTable Options
            });
            $('#example-multi tbody').on('click', 'tr', function () {
                $(this).toggleClass('bg-gray-400');
            });
        });

    }

});
