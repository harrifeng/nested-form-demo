var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello World Vuejs on Rails',
        hotels: []
    },
    mounted: function() {
        var that;
        that = this;
        $.ajax({
            url: '/hotels.json',
            success:function(res) {
                that.hotels = res;
            }
        });
    }
});
