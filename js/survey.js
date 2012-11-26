$(function() {
    $('.formToggleBtn').click(function(e) {
        var $this = $(this);
        var toToggle = $this.attr('id').replace('Add', '').replace('Remove', '');
        $('#' + toToggle + 'Add').fadeToggle('slow');
        $('.' + toToggle + 'Input').slideToggle('slow');
        e.preventDefault();
    });
});