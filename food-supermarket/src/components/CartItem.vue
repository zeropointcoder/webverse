<script setup>

</script>

<template>
    <tr>
        <th scope="row">item.id</th>
        <td>
            <img src="item.image" class="" alt="item.name" width="100" height="100" />
        </td>
        <td>item.name</td>
        <td>item.quantity</td>
        <td>item.price</td>
        <td>
            <button type="button" class="btn btn-sm btn-outline-primary">➖</button>
        </td>
        <td>
            <button type="button" class="btn btn-sm btn-outline-primary">➕</button>
        </td>
        <td>£0</td>
        <td>
            <button type="button" class="btn btn-sm btn-outline-danger">🗑️</button>
        </td>
    </tr>
</template>