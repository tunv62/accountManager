var userId

$('.delete').click(function(){
    userId = $(this).attr('id')
    $('#deleteModal').modal('show')
})

$('#btn_delete').click(function(){
    console.log('check')
    console.log('why'+ userId)
    $.ajax({
        url: '/admin/' + userId,
        method: 'DELETE',
        success: function(data){
            alert(data)
            $('#deleteModal').modal('hide')
            window.location.href = '/admin'
            // $('#user_table').dataTable().ajax.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    })
})

$('.update').click(function(){
    userId = $(this).attr('id')
    $('#updateModal').modal('show')
})

$('#btn_update').click(function(){
    let firstname = $('#firstname').val()
    let lastname = $('#lastname').val()
    $.ajax({
        url: '/admin/' + userId,
        method: 'PUT',
        data: {
            firstname: firstname,
            lastname: lastname
        },
        success: function(data){
            alert(data)
            $('#updateModal').modal('hide')
            window.location.href = '/admin'
            // $('#user_table').dataTable().ajax.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    })
})