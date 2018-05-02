<?php

return [
    'service_profile_item' => [
        'validate_error_required'               => 'を入力してください。',
        'validate_input_required'               => 'を入力してください。',
        'validate_error_exists_user_id'         => 'が存在しません。',
        
        'validate_errors_user_id_not_existed'   => '存在しない:columnが入力されています。',
        'validate_errors_user_id_must_be_blank' => '作成時に:columnは入力できません。',
        'validate_errors_role_id_not_existed'   => '存在しない:columnが入力されています。',
        'validate_errors_role_id_not_belong_to_user' => '設定できない:columnが入力されています。',
        'validate_errors_avatar_preset_not_existed' => '存在しない:columnが入力されています。',
        'validate_errors_group_not_existed'     => ':columnに存在しないグループIDが入力されています。',
        'validate_errors_cannot_assign_group'   => '設定できない:columnが入力されています。',
        'validate_errors_value_is_valid'        => ':columnに不正な値が入力されています。',
        // 'validate_errors_change_type'           => ':columnに不正な値が入力されています。',
        
        'validate_error_length_between'         => 'は:min文字以上:max文字以内で入力してください。',
        'validate_error_between'                => 'は:min文字以上:max文字以内で入力してください。',
        'validate_error_length_min'             => 'は:min文字以上。',
        'validate_error_length_max'             => 'は0文字以上:max文字以内で入力してください。',
        'validate_error_min_eq_max'             => 'は:max文字で入力してください。',
        'validate_error_regex'                  => 'に使用できない文字が含まれています。',
        'validate_error_email_format'           => 'が不正な形式です。',
        'validate_error_exists'                 => 'が不正な値です。',
        'validate_error_multi_select_exists'    => 'が不正な値です。',
        'validate_error_single_select_exists'   => 'が不正な値です。',
        'validate_error_format'                 => 'が不正な値です。',
        'validate_error_after_or_equal'         => 'が不正な値です。',
        'validate_error_before_or_equal'        => 'が不正な値です。',
        'validate_error_birthday_between'       => 'が不正な値です。',
        'validate_error_birthday_current'       => 'が不正な値です。',
        'validate_error_not_found_zipcode'      => '郵便番号が不正な値です。',
        'validate_error_type_request'           => 'リクエストのエラータイプ。',
        'validate_error_fail_request'           => '失敗したリクエスト。',
        'validate_error_max_image'              => 'プロフィール画像のアップロードサイズの上限を超えています。',
        'validate_error_mimes_image'            => 'プロフィール画像のファイル形式が間違っています。',
        'validate_error_exists_id_login'        => 'ログインIDはすでに登録されています。',
        'validate_error_secret_question'        => 'が不正な値です。',
        'validate_error_email'                  => 'が不正な形式です。',
        'password_require'                      => 'を入力してください。',
        'password_max_min'                      => 'は8文字以上16文字以内で入力してください。',
        'password_error'                        => 'に使用できない文字が含まれています。',
        'password_3_consecutive_characters'     => 'には3回以上連続した文字を使えません。',
        'password_exist_login_id_character'     => 'にはログインID内の文字が使えません。',
        'password_2_consecutive_characters'     => 'には２文字以上の単語を連続して使えません。',
        'password_error_same'                   => '入力内容が間違っています。',
        'password_halfsize_invalid'             => 'は半角大英字、半角小英字、半角数字、半角記号のすべてを含めてください。',
        'exists_id_login'                       => 'はすでに登録されています。',
        'cannot_input_when_create'              => '作成時に:headerは入力できません。',
        'lbl_select_sg'                         => '選択してください',
        'lbl_select_mp'                         => '選択してください',
        'lbl_year'                              => '年',
        'lbl_month'                             => '月',
        'lbl_day'                               => '日',
        'lbl_confirm'                           => '（確認）'
    ],
    'page_not_found' => '画面が存在しません。',
    
    'btn_confirm' => '確認',
    'btn_create' => '作成',
    'btn_cancel' => 'キャンセル',
    'btn_back' => '戻る',
    'btn_edit' => '編集',
    'btn_update' => '更新',
    'btn_delete' => '削除',
];