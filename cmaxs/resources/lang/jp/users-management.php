<?php

return [
    /**
     * Language Japan Users Management
     */
    //Heading
    'head_create_title'       => '管理ユーザー作成(入力)',
    'head_create'             => '管理ユーザー作成(入力)',
    'head_create_confirm_title'     => '管理ユーザー作成(確認)',
    'head_create_confirm'     => '管理ユーザー作成(確認)',
    'head_create_serial_title'         => '管理ユーザー一括作成(入力)',
    'head_create_serial'         => '管理ユーザー一括作成(入力)',
    'head_create_serial_confirm_title' => '管理ユーザー一括作成(確認)',
    'head_create_serial_confirm' => '管理ユーザー一括作成(確認)',
    'head_list_title'               => '管理ユーザー一覧',
    'head_list'               => '管理ユーザー一覧',
    'head_detail'             => '管理ユーザー詳細',
    'head_edit_title'               => '管理ユーザー編集(入力)',
    'head_edit'               => '管理ユーザー編集(入力)',
    'head_edit_confirm_title'       => '管理ユーザー編集(確認)',
    'head_edit_confirm'       => '管理ユーザー編集(確認)',
    'head_delete_title'             => '管理ユーザー削除(確認)',
    'head_delete'             => '管理ユーザー削除(確認)',
    'head_search_result' => '検索結果',

    // Common
    'lbl_user_id'             => 'ユーザーID',
    'lbl_name' => '氏名',
    'lbl_kana' => 'カナ',
    'lbl_login_id'          => 'ログインID',
    'lbl_user_username'       => '氏名',
    'lbl_password' => 'パスワード',
    'lbl_password_confirm' => 'パスワード確認',
    'lbl_group'               => 'グループ指定',
    'lbl_type'              => '種別',
    'lbl_project'           => '項目',
    'lbl_state'               => '状態',
    'lbl_profile' => 'プロフィール',
    'lbl_postal_code' => '郵便番号',
    'lbl_prefectures' => '都道府県',
    'lbl_gender' => '性別',
    'lbl_auth_role' => '権限ロール',
    'lbl_created_at' => '登録日時',
    'lbl_updated_at' => '更新日時',
    'lbl_dormant_on'            => '稼働中',
    'lbl_dormant_off'           => '休止',
    'lbl_lock_account'          => 'ロック中',
    'lbl_unselected'  => '選択してください',
    'lbl_authority'   => '操作権限',
    'lbl_lock'        => 'アカウントロック',

    // List User - 168_管理ユーザー一覧表示
    'lbl_lock' => 'アカウントロック',
    'lbl_operating' => '操作',
    'lbl_module' => 'モジュール',
    'lbl_function' => '機能',
    'lbl_function_available' => '利用可能な機能',
    'lbl_sort' => 'ソート順',

    // Detail User - 169_管理ユーザー詳細表示
    'lbl_admin_username' => '管理ユーザー名',
    'lbl_admin_email' => 'メールアドレス',
    'lbl_admin_permission' => '権限ロール',
    'lbl_admin_auth' => 'SS権限',
    'lbl_admin_group' => '所属グループ',
    'lbl_admin_avatar' => 'プロフィール画像',
    'lbl_admin_belong' => '所属',

    // Create Serial - 170_管理ユーザー一括作成：入力
    'lbl_csv' => 'CSVファイル',
    'lbl_rows' => '行数',
    'lbl_error_content' => 'エラー内容',

    // Create Serial Confirm - 171_管理ユーザー一括作成：確認
    'lbl_group_confirm' => 'グループ',

    // Create Individual
    'lbl_operate' => '拡張操作',
    'lbl_function_possible' => '可能な機能',
//    'lbl_control_group' => '対照グループ',
    'lbl_control_group' => '所属グループ',
    'lbl_avatar_select' => 'アバター選択',
    'lbl_avatar_image' => 'プロフィール画像',

    // Button
    'btn_add' => '追加',
    'btn_edit' => '編集',
    'btn_delete' => '削除',
    'btn_back_index' => '一覧に戻る',
    'btn_detail' => '詳細',
    'btn_search' => '検索',
    'btn_upload' => 'アップロード',
    'btn_reference' => '参照',
    'btn_stop' => '中止',
    'btn_create' => '作成',
    'btn_confirm' => '確認',
    'btn_cancel' => 'キャンセル',
    'btn_update' => '更新',
    'btn_fix' => '修正',
    'btn_back' => '戻る',

    'error_invalid' => '不正な入力形式です。',
    'error_policy'              => '画面の表示に失敗しました。',


    'warning_confirm' => '以下の内容で作成します。',
    'warning_update_confirm' => '以下の内容で更新します。',
    'warning_delete' => '以下の内容を削除します。',

    'validate_error_not_found_zipcode' => '郵便番号が不正な値です。',
    'validate_error_fail_request' => '失敗したリクエスト',

    'val_password_show' => '******',

    //Table heading
    'th_function'             => '管理機能',
    'th_operation'            => '操作',

    'error_upload_csv_fail'     => 'CSVファイルのアップロードに失敗しました。',
    'message_upload_success'    => 'CSVファイルのアップロードに成功しました。',
    'message_upload_fail'       => 'CSVファイルのアップロードに失敗しました。',
    'message_format_csv'        => 'ファイルの形式が不正です。',
    'message_encoding_sjis'        => '文字コード Shift-Jis を指定してください。',
    'message_fail_display' => '操作権限がありません。',
    'message_blank_file_csv'    => 'データが入力されていません。',
    'message_wrong_column_name' => ':columnが存在しません。',
    'message_wrong_header_name' => ':columnが存在しません。',
    
    'message_exceeded_30_rows' => '一度に変更できるデータは、30行までです。',

    'msg_show_page_fail' => '操作権限がありません。',
    'msg_err_edit_user_fail' => 'ユーザーの編集に失敗しました。',
    'msg_err_group_inside_type_group' => ':groupに使用できないグループIDが入力されています。',
    'msg_validate_csv' => [
        'validate_err_group' => '設定できない:headが入力されています。',
        'validate_err_preset' => '存在しない:headが入力されています。',
        'validate_err_role' => '設定できない:headが入力されています。',
        'validate_err_in_operation' => 'に不正な値が入力されています。',
        'validate_err_invalid_operation' => ':columnを入力してください。',
        'validate_err_change_type' => 'に不正な値が入力されています。',
        'validate_err_invalid_change_type' => ':columnを入力してください。',
        'validate_err_group_not_exist' => ':columnに存在しないグループIDが入力されています。',
        'validate_err_group_not_inside_admin' => '権限がない:columnが入力されています',
    ],
    'msg_no_permission' => '操作権限がありません。',
    'msg_db_error' => 'DBでエラーが発生しました。',
    'msg_api_error' => 'SS-APIでエラーが発生しました。',
    
    'msg_group_unsetting' => 'グループ未設定',
    'msg_warning_group_unsetting' => 'グループが登録されていません。'
];
