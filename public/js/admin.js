
function processData(data, option) {
    let result = ""
    if(option) result = "<table id=\"user_table\"> <tr> <th>id</th> <th>email</th> <th>First Name</th> <th>Last Name</th> </tr>"
    for (let user of data) {
        result += "<tr id=\"" + user._id + "\">"
            + "<td>" + user._id + "</td>"
            + "<td>" + user.local.email + "</td>"
            + "<td>" + user.info.firstname + "</td>"
            + "<td>" + user.info.lastname + "</td>"
            + "<td>"
            + "<button class=\"btn update\" id=\"" + user._id + "\">update</button>"
            + "<button class=\"btn delete\" id=\"" + user._id + "\">delete</button>"
            + "</td>"
            + "</tr>"
    }
    if(option) result += "</table>"
    return result
}

function loadData(pageCurrent) {
    $.ajax({
        url: '/admin/pagination',
        method: 'GET',
        dataType: 'json',
        data: {
            page: pageCurrent
        },
        success: function (dt) {
            let { data } = dt
            $('#data_table').html(processData(data, true))
            console.log('inside load data method')
        },
        error: function (textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    })
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
            console.log('inside load data method')
    },  
    error: function (textStatus, errorThrown) {
        console.log('error ' + textStatus + " " + errorThrown);
    }
    })
}

$(document).ready(function () {

    var pageCurrent = parseInt(1)
    loadData(pageCurrent)
    var userId
    
    $('.see-more').hide()

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
                loadData(pageCurrent)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        })
    })

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
                loadData(pageCurrent)
                // alert($('tr#'+userId).attr('id'))
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
                console.log('check------')
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
                $('#data_table').append(processData(data, false))
                //$('#data_table').html(processData(data, false))
            },
            error: function(textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        })
    })
})

