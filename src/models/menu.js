export default { 
    namespace: 'menu',
    state: {
        user: [{
            label: 'menu_user_index',
            icon: 'xiaoshou',
            url: '/count',
            items:[{
                label: 'menu_user_index',
                icon: 'xiaoshou',
                url: '/count',
            },{
                label: 'menu_user_products',
                icon: 'gouwuche',
                url: '/orders',
            }
            ]
        }
        ]
    }
}