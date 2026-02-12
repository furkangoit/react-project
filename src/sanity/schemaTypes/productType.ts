import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'stockStatus',
            title: 'Stock Status',
            type: 'string',
            options: {
                list: [
                    { title: 'In Stock', value: 'inStock' },
                    { title: 'Out of Stock', value: 'outOfStock' },
                    { title: 'Pre-order', value: 'preOrder' },
                ],
            },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Gaming', value: 'gaming' },
                    { title: 'Art', value: 'art' },
                    { title: 'Custom', value: 'custom' },
                ],
            },
        }),
        defineField({
            name: 'material',
            title: 'Material',
            type: 'string',
            options: {
                list: [
                    { title: 'PLA', value: 'pla' },
                    { title: 'Resin', value: 'resin' },
                ],
            },
        }),
    ],
})
