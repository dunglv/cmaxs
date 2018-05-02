<?php
return [
    /**
     * -------------------------------------------------------------------------
     * Language Japan
	 * 
	 * Task 055-Screen No 215-management content
     * -------------------------------------------------------------------------
     */
    
    'page_title' => 'コンテンツ一覧',
    'page_title_curriculum' => '教材コンテンツ管理',
    'page_header' => 'コンテンツ一覧',
    'main_head_curriculum' => '教材コンテンツ管理',
    'lbl_search_id' => 'コンテンツID',
    'lbl_search_content_name' => 'コンテンツ名',
    'lbl_search_content_type' => 'コンテンツ種別',
    'lbl_search_drill_type' => 'ドリル種別',
    'lbl_search_created_time' => '登録日時',
    'lbl_sort_type' => 'ソート順',
    'search_result_total_num' => '全:total件',
    'head_search_result' => '検索結果',
    
    'btn_search' => '検索',
    'btn_go_detail' => '詳細',
    'btn_password_module' => 'パスワード変更',
    'btn_mail_module' => 'メール送信',
    
    //Result search table
    'col_td_ID' => 'ID',
    'col_td_content_name' => 'コンテンツ名',
    'col_td_content_type' => 'コンテンツ種別',
    'col_td_drill_type' => 'ドリル種別',
    'col_td_created_time' => '登録日時',
    'col_td_updated_time' => '更新日時',
    'col_td_action' => '操作',
    
    //Modal table
    'modal_col_td_ID' => 'アイテムID',
    'modal_col_td_name' => 'アイテム名',
    'modal_col_td_password' => 'パスワード',
    'modal_col_td_updated_time' => '更新日時',
    'modal_col_td_created_time' => '登録日時',
    'modal_col_td_action' => '操作',
    'modal_col_td_on_off' => '有効/無効',
    'modal_col_td_choose' => '選択',
    'modal_col_td_select_all' => 'すべて選択',
    'modal_col_td_cancel_all' => 'すべて解除',
        
    //Modal button
    'modal_btn_setting' => '設定',
    'modal_btn_change' => '変更',
    'modal_btn_enable' =>'有効',
    'modal_btn_disable' =>'無効',
    'modal_btn_confirm' =>'確定',
    'modal_btn_cancel' =>'キャンセル',
    'modal_btn_enable_transmission' =>'有効化',
    'modal_btn_disable_transmission' =>'無効化',
    
    //Modal content
    'modal_lbl_transmission_enable' =>'有効',
    'modal_lbl_transmission_disable' =>'無効',
   
    //Modal content set password
    'modal_header_set_pass' => ':contentName - アイテム一覧　パスワード設定',
    
    //Modal content config send mail
    'modal_header_set_mail' => ':contentName - アイテム一覧 メール送信設定',
    
    //Not choose
    'place_holder_selectbox' => '未設定', 
    
    //Msg
    'msg_display_screen_fail' => '画面の表示に失敗しました。',
    'msg_group_access'        => '権限がありません。',
    'msg_no_record'           => '検索結果が0件でした。',
    'msg_record'              => '検索結果 : :total件中 :from-:to件表示',
    'msg_content_has_not_items'          => 'コンテンツに紐付くアイテムが登録されていません。',
    
    //Msg error
    'msg_error_no_permission'            => '操作権限がありません。',
    'msg_error_module_set_password'      => 'ドリル起動パスワード機能を有効にしてください。',
    'msg_error_module_send_mail_report'  => 'テスト結果送信機能を有効にしてください。',

    //Link to SS
    'link_drill'              => 'ドリル管理',
    'link_video'              => '動画管理',
    'link_document'           => 'ドキュメント管理',
    'link_link'               => 'リンク管理',

    //Define Enum
    'enum_content_type' => [
        1 => 'ドリル', //drill
        0 => 'ビデオ', //video
        3 => 'ドキュメント', //document
        5 => 'リンク', //link
        6 => '双方向ライブ', //2 way live
    ],

    'enum_drill_type_for_item' => [
        0 => 'ドリル', //drill mode
        1 => 'テスト', //test mode
        2 => '添削レポート', //correction report
    ],
        
    'enum_content_sort_type' => [
        1 => 'コンテンツID（昇順）', //Content ID (ascending order)
        2 => 'コンテンツID（降順）', //Content ID (descending order)
        3 => 'コンテンツ名（昇順）', //Content name (ascending order)
        4 => 'コンテンツ名（降順）', 
        5 => 'コンテンツ種別（昇順）', //Content type (ascending order)
        6 => 'コンテンツ種別（降順）',
//        7 => 'コンテンツ提供種別（昇順）', //Content offer type (ascending order)
//        8 => 'コンテンツ提供種別（降順）',
        9 => '登録日時（昇順）', //Registration date (ascending order)
        10 => '登録日時（降順）',
        11 => '更新日時（昇順）', //Update date (ascending order)
        12 => '更新日時（降順）',
    ]
];