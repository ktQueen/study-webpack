<div class="layer">
    <img src="${ require('../../assets/123.jpeg') }">
    <div>
        this is <%= name %> layer
        <% for (var i=0;i<arr.length;i++){ %>
            <%= arr[i] %>
        <% } %>
    </div>
</div>