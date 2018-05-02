<?php

return [
    /**
     * Language Japan For 052.一般ユーザー管理
     */

    'head_list'                 => '一般ユーザー一覧',
    'head_list_user'            => '一般ユーザー一覧',
    'head_create'               => '一般ユーザー作成(入力)',
    'head_create_confirm'       => '一般ユーザー作成(確認)',
    'head_search_result'        => '検索結果',
    'head_edit'                 => '一般ユーザー編集(入力)',
    'head_edit_confirm'         => '一般ユーザー編集(確認)',
    'head_detail'               => '一般ユーザー詳細',
    'head_upload_csv'           => '一般ユーザー一括変更(入力)',
    'head_list_csv'             => '一般ユーザー一括変更処理進捗一覧',
    'head_upload_csv_input'     => '一般ユーザー一括変更(入力)',
    'head_create_user_input'    => '一般ユーザー作成(入力)',
    'head_create_user_confirm'  => '一般ユーザー作成(確認)',
    'head_edit_user_input'      => '一般ユーザー編集(入力)',
    'head_edit_user_confirm'    => '一般ユーザー編集(確認)',
    'head_delete_user_confirm'  => '一般ユーザー削除(確認)',


    // Label
    'lbl_id'                    => 'ID',
    'lbl_user_id'               => 'ユーザーID',
    'lbl_user_username'         => 'ユーザー名',
    'lbl_user_username_front'   => '氏名',
    'lbl_login_id'              => 'ログインID',
    'lbl_password'              => 'パスワード', 
    'lbl_password_confirm'      => 'パスワード（確認）',
    'lbl_group'                 => 'グループ',
    'lbl_type'                  => '種別',
    'lbl_project'               => '項目',
    'lbl_state'                 => '状態',
    'lbl_guardian_type'         => '保護者設定', 
    'lbl_select_guardian'       => '保護者選択',
    'lbl_profile'               => 'プロフィール',
    'lbl_prefectures'           => '都道府県',
    'lbl_gender'                => '性別',
    'lbl_sort'                  => 'ソート順',
    'lbl_postal_code'           => '郵便番号',
    'lbl_prefectures'           => '都道府県',
    'lbl_auth_role'             => '権限ロール',
    'lbl_created_at'            => '登録日時',
    'lbl_updated_at'            => '更新日時',
    'lbl_lock'                  => 'アカウントロック',
    'lbl_operating'             => '操作',
    'lbl_name'                  => '氏名',
    'lbl_kana'                  => 'カナ',
    'lbl_display_username'      => 'ユーザー表示名',
    'lbl_email'                 => 'メールアドレス',
    'lbl_secret_question'       => '秘密の質問', 
    'lbl_secret_answer'         => '秘密の質問の回答', 
    'lbl_students'              => '学生',
    'lbl_class'                 => 'クラス',
    'lbl_desired_field'         => '志望分野',
    'lbl_university_field'      => '大学分野',
    'lbl_university_type'       => '大学種別',
    'lbl_location'              => '所在地',
    'lbl_address'               => '住所',
    'lbl_phone_numb'            => '電話番号',
    'lbl_birth_day'             => '生年月日',
    'lbl_secret_question'       => '秘密の質問',
    'lbl_secret_answer'         => '秘密の質問の回答',
    'lbl_unselect'              => '未選択',
    'lbl_select'                => '選択',
    'lbl_guardian'              => '保護者',
    'lbl_student'               => '生徒',
    'lbl_in_operation'          => '稼働中',
    'lbl_dormant'               => '休止',
    'lbl_func'                  => '詳細',
    'lbl_dormant_on'            => '稼働中',
    'lbl_dormant_off'           => '休止',
    'lbl_lock_account'          => 'ロック中',
    'lbl_password_crypt'        => '******',
    'lbl_sex_male'              => '男',
    'lbl_sex_female'            => '女',
    'lbl_sex_random'            => 'その他',
    'lbl_non_setting'           => '未設定',
    'lbl_group_links'           => 'ユーザー管理',
    'lbl_confirm_text'          => '（確認）',

    'lbl_course_study'          => '履修コース',
    'lbl_course'                => 'コース選択',
    'lbl_course_name'           => 'コース名',
    'lbl_search_address'        => '住所検索',
    'lbl_back_popup'            => '閉じる',
    'lbl_category_profile'      => 'プロフィール項目',
    'lbl_setting_account'       => 'アカウント設定',
    'lbl_male'                  => '男性',
    'lbl_female'                => '女性',
    'lbl_other'                 => 'その他',
    'lbl_user_child'            => '子ユーザー一覧',
    'lbl_csv'                   => 'CSVファイル',
    'lbl_row_num'               => '行数',
    'lbl_error'                 => 'エラー内容',
    'lbl_placeholder_user_id'   => '半角英数字',
    'lbl_placeholder_login_id'  => '半角英数字',
    'lbl_placeholder_name'      => 'foo',
    'placeholder_password'      => '半角英数',
    'placeholder_login_id'      => '半角英数',
    'placeholder_full-half'     => '半角全角',
    'placeholder_half-size'     => '半角英数',
    'placeholder_number'        => '半角数字のみ',
    
    //Msg
    'msg_create_confirm'        => '以下の内容で作成します。',
    'msg_edit_confirm'          => '以下の内容で更新します。',
    'msg_warning_group_not_setting'  => 'グループ未設定',

    // Error
    'error_not_found_zipcode'   => '郵便番号が不正な値です。',
    'error_max_length_zipcode'  => 'は7文字で入力してください。',
    'error_exist_secern_id'     => 'すでに登録されているユーザーIDです。',
    'error_register_user_fail'  => 'SS-APIでエラーが発生しました。',
    'error_delete_user_fail'    => 'ユーザー登録に失敗しました',
    'error_edit_user_fail'      => 'ユーザー編集に失敗しました。',
    'error_policy'              => '操作権限がありません。',
    'error_not_exist_user'      => 'すでに削除されているユーザーまたは操作されているユーザーです。',
    'message_create_success'    => '作成に成功しました。',
    'message_edit_success'      => '編集に成功しました。',
    'error_unlock_user_fail'    => ':usernameのアカウントロック解除に失敗しました。',
    'error_unlock_user_success' => ':usernameのアカウントロックを解除しました。',
    'error_upload_csv_fail'     => 'CSVファイルのアップロードに失敗しました。',
    'message_upload_success'    => '処理を受付ました。',
    'message_upload_fail'       => 'CSVファイルのアップロードに失敗しました。',
    'message_format_csv'        => 'ファイルの形式が不正です。',
    'message_encoding_sjis'        => '文字コード Shift-Jis を指定してください。',
    'message_fail_display'      => '操作権限がありません。',
    'message_not_found'         => 'ページが存在しません',
    'message_blank_file_csv'    => 'データが入力されていません。',
    'message_wrong_column_name' => 'が存在しません。',
    'message_wrong_sum_column'  => 'message wrong column',
    'message_exist_six_group'   => 'グループ種別が６つ以上存在します。グループ設定をご確認ください。',
    'message_group_access'      => '権限がありません。',
    'message_not_found_record'  => '検索結果が0件でした。',
    'error_5000_line'           => '一度に変更できるデータは、5,000行までです。',
    'validate_parent_flag'      => 'に不正な値が入力されています。',
    'validate_exist_course'     => 'に存在しないコースIDが入力されています。',
    'validate_exist_group'      => 'に存在しないグループIDが入力されています。',
    'validate_require_group'    => 'IDのいずれかにグループIDを入力してください。',
    'validate_not_require_group'=> 'にグループIDは入力できません。',
    'validate_in_operation'     => 'に不正な値が入力されています。',
    'validate_change_type'      => 'に不正な値が入力されています。',
    'validate_group_not_access' => 'に使用できないグループIDが入力されています。',
    'not_require_user_id'       => 'すでに登録された:headerが入力されています。',
    'batch_mes_parent_login_id' => '存在しない:login_headが入力されています。',
    'duplidate_user_id'         => '同じ:headerが入力されています。',

    // Button
    'btn_search'                => '検索',
    'btn_csv'                   => 'CSV出力',
    'btn_detail'                => '詳細',
    'btn_unlock'                => 'ロック解除',
    'btn_back'                  => '一覧に戻る',
    'btn_confirm'               => '確認',
    'btn_add'                   => '追加',
    'btn_delete'                => '削除',
    'btn_update'                => '画面更新',
    'btn_failure'               => '失敗データ出力',
    'btn_course'                => '履修コース選択',
    'btn_edit'                  => '編集',
    'btn_update_confirm'        => '更新',
    'btn_confirm_delet_back'    => '戻る',
    'btn_cancel'                => 'キャンセル',
    'btn_create'                => '作成',
    'btn_back'                  => '戻る',
    'btn_course_process'        => 'コース進捗',
    'btn_select_csv'            => '参照',
    'btn_upload_csv'            => 'アップロード',
    'btn_select_course'         => '確定',
    
    'btn_link_plan'             => '学習計画',
    'btn_link_potofolio'        => 'ポートフォリオ',
    'btn_link_history_point'    => 'ポイント変更',
    'btn_link_following'        => 'フォロー中一覧',
    'btn_link_follower'         => 'フォロワー一覧',

    //Search protector modal
    'modal_btn_choose_protector'       => '選択する',
    'modal_lbl_profile_field_head'     => 'プロフィール',
    'modal_table_tr_user_id'           => 'ID',
    'modal_table_tr_user_name'         => '氏名',
    'modal_table_tr_choose_protector'  => 'ユーザー選択',
    
    // Header file csv error log
    'header_csv' => [
        'line_error'                => 'エラー行数',
        'item_error'                => 'エラー項目名',
        'value_error'               => 'エラー項目の入力値',
        'descripton_error'          => 'エラー内容',
    ],
    
    //画面ID:188_一般ユーザー一括変更処理進捗一覧表示
    'list' => [
        'title'                     => '一般ユーザー一括変更処理進捗一覧',
        'lbl_file_name'             => 'ファイル名',
        'lbl_status'                => '状況',
        'lbl_number_success'        => '処理進捗',
        'lbl_func'                  => '操作',
        'lbl_success'               => '完了',
        'lbl_process'               => '実行中',
        'lbl_booking'               => '予約',
        'btn_output'                => 'エラーログ出力',
        'lbl_status_error'          => 'エラー',
    ],
    
    //画面ID:193_一般ユーザー個別削除 ：確認
    'delete_confirm' => [
        'title'                             => '一般ユーザー削除(確認)',
        'warning_delete'                    => '以下の内容を削除します。',
        'lbl_setting_account'               => 'アカウント設定',
        'lbl_group'                         => 'グループ',
        'lbl_course_study'                  => '履修コース',
        'lbl_category_profile'              => 'プロフィール項目',
        'msg_user_non_exist'                => 'すでに削除されているユーザーです。',
        'msg_delete_user_fail'              => 'SS-APIでエラーが発生しました。',
        'msg_delete_user_success'           => '削除に成功しました。',
        'msg_show_page_fail'                => '操作権限がありません。',
        'msg_group_error'                   => 'グループ種別が5つを超えています。',
    ],
    'csv_head_search' => [
        'user_id'                   => 'ユーザーID',
        'login_id'                  => 'ログインID',
        'current_password'          => '今のパスワード',
        'new_password'              => '新しいパスワード',
        'upload_password_flag'      => 'パスワード変更フラグ',
        'parent_flag'               => '保護者フラグ',
        'parent_loginId'            => '保護者ログインID',
        'secret_question'           => '秘密の質問番号',
        'secret_answer'             => '秘密の答え',
        'user_name'                 => '氏名',
        'email'                     => 'メールアドレス',
        'id_course'                 => 'コースID',
        'course_start_date'         => '受講開始日時',
        'course_end_date'           => '受講終了日時',
        'in_operation'              => '稼働中/休止',
        'change_type'               => '変更種別',
        'missing_group'             => 'グループ種別ID:missing（未使用）',
        'missing_key_num'           => 'プロファイル項目:missing（未使用）'
    ],
    
    'csv_head' => [
        'user_id'           => 'ユーザーID',
        'name_A'            => 'ログインID',
        'name_B'            => 'パスワード',
        'parent_flag'       => '保護者フラグ',
        'parent_loginId'    => '保護者ログインID',
        'name_C'            => '秘密の質問番号',
        'name_D'            => '秘密の答え',
        'name_E'            => '氏名',
        'name_1'            => 'プロファイル項目1（未使用）',
        'name_F'            => 'メールアドレス',
        'name_2'            => 'ユーザー表示名',
        'name_3'            => 'プロファイル項目3（未使用）',
        'name_4'            => 'プロファイル項目4（未使用）',
        'name_5'            => 'プロファイル項目5（未使用）',
        'name_6'            => 'プロファイル項目6（未使用）',
        'name_7'            => 'プロファイル項目7（未使用）',
        'name_8'            => 'プロファイル項目8（未使用）',
        'name_9'            => 'プロファイル項目9（未使用）',
        'name_10'           => 'プロファイル項目10（未使用）',
        'name_11'           => 'プロファイル項目11（未使用）',
        'name_12'           => 'プロファイル項目12（未使用）',
        'name_13'           => 'プロファイル項目13（未使用）',
        'course_id'         => 'コースID',
        'course_start_date' => '受講開始日時',
        'course_end_date'   => '受講終了日時',
        'group_id1'         => 'グループ種別ID1（未使用）',
        'group_id2'         => 'グループ種別ID2（未使用）',
        'group_id3'         => 'グループ種別ID3（未使用）',
        'group_id4'         => 'グループ種別ID4（未使用）',
        'group_id5'         => 'グループ種別ID5（未使用）',
        'in_operation'      => '稼働中/休止',
        'change_type'       => '変更種別'
    ],
    
    'csv_head_batch' => [
        'change_type'       => 'change_type',
        'user_id'           => 'user_id',
        'name_A'            => 'name_A',
        'name_B'            => 'name_B',
        'parent_flag'       => 'parent_flag',
        'parent_loginId'    => 'parent_loginId',
        'name_C'            => 'name_C',
        'name_D'            => 'name_D',
        'name_E'            => 'name_E',
        'name_1'            => 'name_1',
        'name_F'            => 'name_F',
        'name_2'            => 'name_2',
        'name_3'            => 'name_3',
        'name_4'            => 'name_4',
        'name_5'            => 'name_5',
        'name_6'            => 'name_6',
        'name_7'            => 'name_7',
        'name_8'            => 'name_8',
        'name_9'            => 'name_9',
        'name_10'           => 'name_10',
        'name_11'           => 'name_11',
        'name_12'           => 'name_12',
        'name_13'           => 'name_13',
        'course_id'         => 'course_id',
        'course_start_date' => 'course_start_date',
        'course_end_date'   => 'course_end_date',
        'group_id1'         => 'group_id1',
        'group_id2'         => 'group_id2',
        'group_id3'         => 'group_id3',
        'group_id4'         => 'group_id4',
        'group_id5'         => 'group_id5',
        'in_operation'      => 'in_operation',
        'line'              => 'line',
    ]
];
