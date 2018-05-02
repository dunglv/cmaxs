<?php

return [
   // Buddy Translate

    'head_create_upload_title' => 'バディ作成',
    'head_create_upload' => 'バディ作成',
    'head_create_confirm_title' => 'バディ作成(確認)',
    'head_create_confirm' => 'バディ作成(確認)',
    'head_list_title' => 'バディ一覧',
    'head_list' => 'バディ一覧',
    'head_detail_title' => 'バディ詳細',
    'head_detail' => 'バディ詳細',
    'head_edit_title' => 'バディ編集',
    'head_edit' => 'バディ編集',
    'head_edit_confirm_title' => 'バディ編集(確認)',
    'head_edit_confirm' => 'バディ編集(確認)',
    'head_delete_title' => 'バディ削除(確認)',
    'head_delete' => 'バディ削除(確認)',

    'head_search_result' => '検索結果',

    'lbl_group' => 'グループ',
    'lbl_type' => '種別',
    'lbl_project' => '項目',
    'lbl_sort' => 'ソート順',
    'lbl_status_enable' => '有効',
    'lbl_status_disable' => '無効',
    'lbl_guide_enable' => 'ガイド役',
    'lbl_machine_enable' => 'システム',
    'lbl_default_attribute' => '-',

    'lbl_input_id' => 'ID',
    'lbl_input_name' => '名前',
    'lbl_admin_name' => '管理名',
    'lbl_list_image' => '画像',
    'lbl_description' => '説明',
    'lbl_available_detail' => '有効',
    'lbl_attribute' => '属性',
    'lbl_create_at' => '作成日時',
    'lbl_update_at' => '更新日時',
    'lbl_serif' => 'セリフ',
    'lbl_list_serif' => '会話文一覧',

    'lbl_message_note' => 'ガイド役に指定できるバディは1体のみです。',

    // button
    'btn_upload' => 'アップロード',
    'btn_search' => '検索',
    'btn_return' => '戻る',
    'btn_download_sample' => 'サンプルファイルをダウンロードする',
    'btn_download_sample_current' => '現行設定ファイルをダウンロードする',
    'buddy_create_message' => 'バディを作成しました。',
    'buddy_edit_message' => 'バディを編集しました。',
    'buddy_error_structure' => 'バディ紹介文（description.txt）がありません。',
    'buddy_invalid_id' => ':存在しないバディIDです。',

    'btn_detail' => '詳細',
    'btn_select_all' => 'すべて選択',
    'btn_unselect_all' => 'すべて解除',
    'btn_delete_all' => '一括削除',
    'btn_enable_buddy' => '有効化',
    'btn_disable_buddy' => '無効化',
    'btn_update_guide' => 'ガイド役更新',
    'btn_link_edit' => '編集',
    'message_edit_available_success' => 'バディを編集しました。',
    'message_edit_guide_success' => 'ガイド役を変更しました。',
    'message_delete_success' => 'バディを削除しました。',
    'message_load_default_success' => '設定を反映しました。',

    'buddy_create_not_allow_access' => '操作権限がありません。',
    'buddy_image_not_exist' => '「通常」の表情画像が設定されていません。',

    'msg_err_enable_none_buddy' => '有効化するバディを選んでください。',
    'msg_err_disable_none_buddy' => '無効化するバディを選んでください。',
    'msg_err_guide_none_buddy' => 'ガイド役のバディは必ず指定してください。',
    'msg_err_guide_validate' => 'ガイド役のバディは1体のみ指定してください。',
    'msg_err_guide_non_update' => '無効状態のバディはガイド役にできません。',
    'msg_err_delete_none_buddy' => '削除するバディを選んでください。',
    'msg_err_check_user_buddy' => 'バディの使用履歴が存在するので、デフォルトバディに戻すことはできません。',
    'msg_err_check_user_buddy_enable' => 'バディの使用履歴が存在するので、バディ名：{buddy_name} を有効化することはできません。',
    'msg_err_check_user_buddy_disable' => 'バディの使用履歴が存在するので、バディ名：{buddy_name} を無効化することはできません。',
    'msg_err_check_user_buddy_guide' => 'バディの使用履歴が存在するので、バディ名：{buddy_name} をガイド役更新することはできません。',
    'msg_err_check_user_buddy_delete' => 'バディの使用履歴が存在するので、バディ名：{buddy_name} を削除することはできません。',
    'buddy_image_type' => '{image_name}:形式はJPEG,PNG,GIF のみアップロードが可能です。',
    'buddy_image_size' => '{image_name}:画像の容量は512KBまでです。',
    'buddy_image_dimension' => '{image_name}:画像の一辺の長さ512pxまでです。',
    'buddy_description_require' => 'バディ紹介文は必須入力です。',
    'buddy_description_max' => 'バディ紹介文は最大1000文字まで入力可能です。',
    'buddy_name_required' => 'バディ名は必須入力です。',
    'buddy_name_max' => 'バディ名は最大32文字まで入力可能です。',
    'buddy_admin_name_unique' => '同じバディ管理名が存在します。',
    'msg_err_param_serif' => '{line_number}:存在しない変数名が使われています。',
    'msg_err_duplicate_image' => '{image_status}の表情画像が重複しています。',
//    'msg_err_not_exist_image' => '{image_name}:バディ画像が設定されていません。',
    'msg_err_not_exist_image' => '{image_name}:の表情画像が設定されていません。',
    'msg_err_serif_body_required' => '{line_number}:バディ会話文は必須入力です。',
    'msg_err_serif_body_max_len' => '{line_number}:バディ会話文は最大1000文字まで入力可能です。',
    'msg_err_invalid_file_name' => '{line_number}:バディ会話文は最大1000文字まで入力可能です。',
    
    'buddy_error_structure_line_csv' => '会話文:fileがありません。',
    'buddy_error_structure_presentations' => ':fileバディ画像が設定されていません。',
    'msg_err_max_length_line' => '会話文:line行目:存在しない会話条件種別です。',
    'buddy_id_required' => 'バディIDは必須入力です。',
    'buddy_name_admin_required' => 'バディ管理名は必須入力です。',
    'buddy_name_admin_max' => 'バディ管理名は最大:max_length文字まで入力可能です。',
    'err_not_exist_line_csv' => '会話文（lines.csv）がありません。',
    'err_presentation_type_invalid' => '表情{presentation_type}:指定しているバディ画像が設定されていません。'
];
