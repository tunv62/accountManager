
function processData(data, option) {
    let result = ""
    if(option) result = "<table id=\"user_table\"> <thead> <tr> <th>id</th> <th>email</th> <th>First Name</th> <th>Last Name</th> <th>update</th> <th>delete</th></tr> </thead> <tbody>"
    for (let user of data) {
        result += "<tr id=\"" + user._id + "\">"
            + "<td>" + user._id + "</td>"
            + "<td>" + user.local.email + "</td>"
            + "<td class=\"firstname\">" + user.info.firstname + "</td>"
            + "<td class=\"lastname\">" + user.info.lastname + "</td>"
            // + "<td>"
            // + "<button class=\"btn update\" id=\"" + user._id + "\">update</button>"
            // + "</td>"
            // + "<td>"
            // + "<button class=\"btn delete\" id=\"" + user._id + "\">delete</button>"
            // + "</td>"
            + "<td class=\"center\"><i class=\"fas fa-edit\"></i></td>"
            + "<td class=\"center\"><i class=\"fas fa-trash-alt\"></i></td>"
            + "</tr>"
            
    }
    if(option) result += "</tbody> <tfoot> <tr> <th>id</th> <th>email</th> <th>First Name</th> <th>Last Name</th> <th>update</th> <th>delete</th> </tr> </tfoot> </table>"
    return result
}

function ajaxPaginition(pageCurrent){
    $.ajax({
        url: '/admin/pagination',
        method: 'GET',
        dataType: 'json',
        data: {
            page: pageCurrent,
        },
        success: function (dt) {
            let { data } = dt
            $('#data_table').html(processData(data, true))
            $('#btn_mid').attr('value', pageCurrent)
            $('#btn_left').attr('value', pageCurrent -1)
            $('#btn_right').attr('value', pageCurrent + 1)
            $('#btn_mid').parent().attr('class', 'page-item active')
            $('.see-more').hide()
            console.log('inside load data method')
    },  
    error: function (textStatus, errorThrown) {
        console.log('error ' + textStatus + " " + errorThrown);
    }
    })
}

function loadDataTable(){
    
    $.ajax({
        url: '/admin/loadDataTable',
        method: 'GET',
        dataType: 'json',
        success: function (dt) {
            let { data } = dt
            // $('#dtMaterialDesignExample').DataTable( {
            //     data: data,
            //     columns: [
            //         { data: '_id' },
            //         { data: 'local.email' },
            //         { data: 'info.firstname' },
            //         { data: 'info.lastname' }
            //     ]
            // });
            //console.log('check')
            $('#dtMaterialDesignExample').html(processData(data, true))
            $('#dtMaterialDesignExample').DataTable({
                "columnDefs": [
                    { className: "text-center", "targets": [4,5] }
                  ]
            })
            console.log('inside load data method')
        },
        error: function (textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    })
}

$(document).ready(function () {

    //demo use datatable 

//     $('#dtMaterialDesignExample').DataTable();
//   $('#dtMaterialDesignExample_wrapper').find('label').each(function () {
//     $(this).parent().append($(this).children());
//   });
//   $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('input').each(function () {
//     const $this = $(this);
//     $this.attr("placeholder", "Search");
//     $this.removeClass('form-control-sm');
//   });
//   $('#dtMaterialDesignExample_wrapper .dataTables_length').addClass('d-flex flex-row');
//   $('#dtMaterialDesignExample_wrapper .dataTables_filter').addClass('md-form');
//   $('#dtMaterialDesignExample_wrapper select').removeClass('custom-select custom-select-sm form-control form-control-sm');
//   $('#dtMaterialDesignExample_wrapper select').addClass('mdb-select');
//   $('#dtMaterialDesignExample_wrapper .mdb-select').materialSelect();
//   $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('label').remove();


    //loadDataTable()

    var pageCurrent = parseInt(1)
    // loadData(pageCurrent)
    ajaxPaginition(pageCurrent)
    var userId
    
    $('.see-more').hide()

    // click delete 

    $(document).on('click', '.delete', function () {
        userId = $(this).attr('id')
        $('#deleteModal').modal('show')
    })

    $(document).on('click', '#btn_delete', function () {
        $.ajax({
            url: '/admin/' + userId,
            method: 'DELETE',
            success: function (data) {
                console.log(data)
                $('#deleteModal').modal('hide')
                $('tr#'+userId).remove()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        })
    })

    // click update

    $(document).on('click', '.update', function () {
        userId = $(this).attr('id')
        $('#updateModal').modal('show')
    })

    $(document).on('click', '#btn_update', function () {
        let firstname = $('#firstname').val()
        let lastname = $('#lastname').val()
        $.ajax({
            url: '/admin/' + userId,
            method: 'PUT',
            data: {
                firstname: firstname,
                lastname: lastname
            },
            success: function (data) {
                console.log(data)
                $('#updateModal').modal('hide')
                $('tr#'+userId+' td.firstname').text(firstname)
                $('tr#'+userId+' td.lastname').text(lastname)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        })
    })

    // -------------Pagination---------------
    // click btn_left
    $(document).on('click', '#btn_left', function(){
        let value = parseInt(this.value)
        if( value > 0) {
            pageCurrent = value
            ajaxPaginition(pageCurrent)
        }
    })

    // click btn_right
    $(document).on('click', '#btn_right', function(){
        let value = parseInt(this.value)
        if( value > 0) {
            pageCurrent = value
            ajaxPaginition(pageCurrent)
        }
    })

    // click Previous
    $(document).on('click', '#btn_previous', function(){
        if( pageCurrent > 1){
            pageCurrent -= 1
            ajaxPaginition(pageCurrent)
        }
    })

    // click next
    $(document).on('click', '#btn_next', function(){
        pageCurrent += 1
        ajaxPaginition(pageCurrent)
    })

    var seeCurrent = parseInt(0)
    var keySearch = ""

    // search
    $(document).on('click', '#btn_search', function(){

        seeCurrent = 1
        keySearch = $('#key_search').val()
        $.ajax({
            url: '/admin/search',
            method: 'GET',
            dataType: 'json',
            data: {
                keySearch: keySearch,
                seeCurrent: seeCurrent
            },
            success: function(dt){
                let { data } = dt
                $('#data_table').html(processData(data, true))
                $('.see-more').show()
                $('#see_more').css('cursor', 'pointer')
            },
            error: function(textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        })
    })

    // click see-more
    $(document).on('click', '#see_more', function(){
        seeCurrent += 1
        $.ajax({
            url: '/admin/search',
            method: 'GET',
            dataType: 'json',
            data: {
                keySearch: keySearch,
                seeCurrent: seeCurrent
            },
            success: function(dt){
                let { data } = dt
                $('#user_table').append(processData(data, false))
            },
            error: function(textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        })
    })
})

