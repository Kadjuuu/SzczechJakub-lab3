$(document).ready(function() {

    var notesArray = [],
        count = 0;

    function listRefresh() {
        $('#list').empty();

        for (var i = 0; i < notesArray.length; i++) {
            var name = notesArray[i].name,
                date = notesArray[i].date,
                dateString,
                month,
                element;

            month = date.getMonth() + 1;
            dateString = date.getDate() + "/" + month + "/" + date.getFullYear();

            element = $('<li data-id="' + notesArray[i].id + '" data-name="' + notesArray[i].name + '">');

            element.append($('<div class="div-name">').text(name));
            element.append($('<div class="div-date">').text(dateString));

            $('#list').append(element);
        }
    }

    $('#list').on('click', 'li', function() {
        var id = $(this).data('id'),
            content = '',
            name = $(this).data('name');


        console.log("name: ", name)
        $('#list li.selected').removeClass('selected');
        $(this).addClass('selected');

        for (var i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id === id) {
                content = notesArray[i].content;
            }
        }

        $('#edit-name').val(name);
        $('#edit-content').val(content);

        $('#div-edit').removeClass('hide');
    })

    $('#add').on('click', function() {
        var name = $('#name').val(),
            content = $('#content').val(),
            date = new Date();

        if (name === "") {
            alert("Twoja notatka musi mieć nazwę.");
        } else {
            notesArray.push({
                id: count,
                name: name,
                content: content,
                date: date
            })
        }

        count++;

        $('#content').val('');
        $('#name').val('');

        listRefresh();
    })

    $('#save').on('click', function() {
        var id = $('#list li.selected').data('id'),
            name = $('#edit-name').val(),
            content = $('#edit-content').val();

        for (var i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id === id) {
                notesArray[i].name = name;
                notesArray[i].content = content;
                break;
            }
        }

        listRefresh();

        $('#list li[data-id="' + id + '"]').addClass('selected');

    })

    $('#cancel').on('click', function() {
        $('#div-edit').addClass('hide');
        $('#list li.selected').removeClass('selected');
    })

    $('#remove').on('click', function() {
        var id = $('#list li.selected').data('id');

        var r = confirm('Czy na pewno chcesz usunąc swoją notatke ?');
        if (r) {
            for (var i = 0; i < notesArray.length; i++) {
                if (notesArray[i].id === id) {
                    notesArray.splice(i, 1);
                    break;
                }
            }

            listRefresh();
            $('#div-edit').addClass('hide');
        }

    })

});