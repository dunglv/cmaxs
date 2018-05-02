<?php 
 
return [ 
    /** 
     * Language Japan Portfolio
     */ 
    'title_delete_confirm' => 'ポートフォリオ設定削除(確認)',
    'head_delete_confirm' => 'ポートフォリオ設定削除(確認)',
    // Heading
    'head_list' => 'ポートフォリオ設定一覧',
    'head_create_confirm' => 'ポートフォリオ設定作成（確認）',
    'title_detail' => 'ポートフォリオ設定詳細',
    'head_detail' => 'ポートフォリオ設定詳細',
    'head_edit' => 'ポートフォリオ設定編集(入力)',
    'head_edit_confirm' => 'ポートフォリオ設定編集(確認)',
    'head_create' => 'ポートフォリオ設定作成(入力)',
    'head_chart' => 'さんのポートフォリオ',
    'head_language_course' => '国語コース',
    'head_math_course' => '数学コース',
    'head_course_setting' => '単元タグパターン設定',
    'title_chart' => 'さんのポートフォリオ',
    'title_portfolio_input' => 'ポートフォリオ設定作成(入力)',
    'title_portfolio_create_confirm' => 'ポートフォリオ設定作成(確認)',
    
    // Title page
    'title_list' => 'ポートフォリオ設定一覧',
    'title_edit' => 'ポートフォリオ設定編集(入力)',
    'title_edit_confirm' => 'ポートフォリオ設定編集(確認)',
    
    // Label
    'lbl_type' => '種別',
    'lbl_project' => '項目',
    'lbl_management_name' => '管理名',
    'lbl_created_at' => '作成日時',
    'lbl_updated_at' => '更新日時',
    'lbl_final_start_date' => '最終集計<br>完了日時',
    'lbl_operation' => '操作',
    'lbl_target_group' => '対象グループ',
    'lbl_apply_course' => '対象科目',
    'lbl_confirm_course' => '対象コース',
    'lbl_target_attribute' => '対象属性',
    'lbl_school_year' => '学年',
    'lbl_class' => 'クラス',
    'lbl_course' => '対象コース',
    
    
    //course setting
    'lbl_current_setting' => '現行設定',
    'lbl_subject' => '科目',
    'lbl_unit_pattert' => '単元パターン',
    'lbl_unit_tag' => '単元タグ',
    'lbl_page' => 'ページ指定',
    'lbl_goto' => '回から表示',
    'lbl_estimate' => '総評',
    'lbl_my' => '自分',
    'lbl_orther'=> '全国',
    'lbl_no_setting' => 'ユーザーに該当するポートフォリオ設定が存在しません。',
    'lbl_create_following' => '以下の内容で作成します。',
    'lbl_edit_following' => '以下の内容で更新します。',
    'lbl_unit_title' => '単元',
    
    // Label delete confirm
    'lbl_top_message' => '以下の内容を削除します。',
    'lbl_pattern_1' => 'パターン:level',
    'lbl_pattern_2' => 'パターン:level',
    'lbl_pattern_3' => 'パターン:level',
    // Btn

    'btn_detail' => '詳細',
    'btn_fix_problem' => '問題情報更新',
    'btn_fix' => '更新',
    'btn_csv_upload' => 'CSVアップロード',
    'btn_confirm' => '確認',
    'btn_cancel' => 'キャンセル',
    'btn_return' => '戻る',
    'btn_create' => '作成',
    'btn_delete' => '削除',
    'btn_edit'   => '編集',
    'btn_aggregating' => '集計中',
    'btn_download' => '現行設定をダウンロード',
    'btn_csv_upload' => 'csvアップロード',
    'btn_updated' => '更新',
    'btn_add'     => '追加',
    'btn_pdf'     => 'PDFに出力する',
    'btn_goto'    => '反映',
    
    // Page porfolio list.
    'list' => [
        'title'                     => 'ポートフォリオ設定一覧',
        'pendding_booking_state'    => '更新予約状態です。しばらくお待ちください。',
        'pendding_update'           => '更新実行中です。しばらくお待ちください。',
        'show_page_fail'            => '画面の表示に失敗しました。',
        'datetime_update'           => '問題情報更新日時：',
        'data_not_found'            => 'ポートフォリオ設定が存在しません。'
    ],
    
    //Validate 
    'format_csv' => 'CSVファイルのみアップロード可能です。',
    'no_data' => 'ファイルにデータが存在しません。',
    'message_no_setting_current' => 'ポートフォリオ用科目が未設定です。',
    'message_fail_display' => '画面の表示に失敗しました。',
    'message_success' => 'ポートフォリオ用科目設定を更新しました。',
    'message_estimate_error' => '総評に入力できる文字数は1000文字までです。',
    'message_portfolio_not_set' => 'ポートフォリオ用科目が設定されていません。',
    'message_validate_number' => '半角数字のみ入力可能です。',
    'message_choose_course_null' => '対象科目を選択してください。' ,
    'message_choose_course_larger_8' => '選択できる対象科目は８個までです。' ,
    'message_max_length_name' => '最大32文字まで入力可能です。' ,
    'message_max_empty_name' => '管理名を入力してください。' ,
    'message_require' => '::attributeが存在しません。',
    'message_course_exit' => ':存在しないコースIDです。',
    'message_course_can_test' => ':テストが存在しないコースが選択されています',
    'message_question_tag' => ':存在しない問題属性IDです。',
    'message_pattert_in' => ':パターンは1から3までの半角数字のみ入力可能です。',
    'message_duplication' => ':同じコースID・パターン・問題属性IDの組み合わせは登録できません。',
    'message_cannot_create_portfolio' => '作成できるポートフォリオ設定数は5件までです。',
    'message_not_good_word' => ':attributeに不適切な表現があります。',
    'message_max_limit_of_course' => ':row:問題属性IDの設定はコースID・パターンに対して、40個までです。'
]; 