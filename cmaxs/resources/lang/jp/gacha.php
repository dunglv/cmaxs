<?php

return [
    
    //Tilte
    'title_create_input'                   => 'ガチャ作成(入力)',
    'title_create_confirm'                 => 'ガチャ作成(確認)',
    'title_detail'                         => 'ガチャ詳細',
    'title_list'                           => 'ガチャ一覧',
    'title_edit_input'                     => 'ガチャ編集(入力)',
    'title_edit_confirm'                   => 'ガチャ編集(確認)',
    
    // Heading
    'head_create'                          => 'ガチャ作成',
    'head_create_confirm'                  => 'ガチャ作成（内容確認）',
    'head_detail'                          => 'ガチャ詳細',
    'head_edit'                            => 'ガチャ編集(入力)',
    'head_edit_confirm'                    => 'ガチャ編集(確認)',
    'head_list'                            => 'ガチャ一覧',
    'head_sub_list'                        => '絞り込み条件',
    'head_modal_list_item'                 => 'アイテム一覧',
    'header_search_result'                 => '検索結果',
    
    // Label
    'lbl_back_popup'                       => '閉じる',
    'lbl_gacha_admin_name'                 => '管理名',
    'lbl_gacha_name'                       => '名前',
    'lbl_gacha_description'                => '説明文',
    'lbl_gacha_image'                      => '画像',
    'lbl_detail_top'                       => '詳細トップ用',
    'lbl_list_for_banner'                  => '一覧バナー用',
    'lbl_banner_not_set'                   => '未設定',
    'lbl_list_for_learning_banner'         => '教材一覧バナー用',
    'lbl_date_time'                        => '開催日時',
    'lbl_gacha_point_use'                  => '使用ポイント',
    'lbl_gacha_prize'                      => '景品',
    
    //List gacha
    'lbl_admin_name'                       => '管理名',
    'lbl_ID'                               => 'ID',
    'lbl_datetime'                         => '開催日時',
    'lbl_search_result'                    => '検索結果',
    'lbl_sort'                             => 'ソート順',
    
    'lbl_search_sex'                       => '性別',
    'lbl_search_layer'                     => 'レイヤー',
    'lbl_search_item_name'                 => 'アイテム名',
    'lbl_search_result'                    => '検索結果',
    'lbl_sort_order'                       => 'ソート順',
    
    
    // Button
    'btn_go_confirm'                       => '確認画面へ',
    'btn_choose_path'                      => '参照',
    'btn_modal_prize_add'                  => '追加',
    'btn_search'                           => '検索',
    'btn_choose'                           => '決定',
    'btn_detail'                           => '詳細',

    // Table prize
    'table_prize' =>
    [
        'id'           => 'ID',
        'name'         => '名前',
        'image'        => 'イメージ',
        'probability'  => '確率',
        'delete'       => '削除',
    ],
    
    // Table search item list
    'table_search_item' =>
    [
        'id'           => 'ID',
        'name'         => 'アイテム名',
        'image'        => '画像',
        'layer'        => 'レイヤー',
        'choose'       => '選択',
    ],
    
    //Table list gacha
    'table_gacha_list' =>
    [
        'id'           => 'ID',
        'admin_name'   => '管理名',
        'name'         => 'ガチャ名',
        'date_start'   => '開始日時',
        'date_end'     => '終了日時',
        'image'        => 'サムネイル',
        'action'       => '操作',
    ],
    
    //Enum for selectbox
    'enum_ID_sort_type' => [
        0 => 'ガチャID(昇順)', //ID (ascending order)
        1 => 'ガチャID(降順)', //ID (descending order)
    ],
    
    // Message
    'error_policy'  => 'アバター機能を有効にしてください。',
    'error_display_page'  => '操作権限がありません。',
    'msg_no_record' => '検索結果が0件でした。',
    'msg_record'    => '検索結果 : :total件中 :from-:to件表示',
    
    //For selectbox display
    'select_not_choose'                      => '未設定',
    'select_male'                            => '男性',
    'select_female'                          => '女性',  
    'sort_type_ID_asc'                       => 'ガチャID(昇順)',
    'sort_type_ID_desc'                      => 'ガチャID(降順)',
    'sort_type_name_asc'                     => 'アイテム名（昇順）',
    'sort_type_name_desc'                    => 'アイテム名（降順）',
    'sort_type_register_date_asc'            => '登録日（昇順）',
    'sort_type_register_date_desc'           => '登録日（降順）',

    'error_max_size_image'                   => '教材一覧バナー用画像に設定できる画像のファイルサイズは128KBまでです。',
    'error_format_image'                     => '教材一覧バナー用画像に設定できるのは PNG, JPEG, GIF のみです。',
    'error_requited_probability'             => '当選確率は必須入力です。',
    'error_max_probability'                  => '当選確率は 0.01 から 100.00 までの半角数字のみ入力可能です。',
    'error_total_probability'                => '景品一覧の確率は合計100%にする必要があります。現在:total_rate%です',
    
    'error_avarfit_connect'                  => 'Avafit サーバーとの接続ができません。'
];
