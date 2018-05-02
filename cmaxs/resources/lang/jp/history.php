<?php

return [
    /**
     * -------------------------------------------------------------------------
     * Task 056-Screen No 220-History login
     * -------------------------------------------------------------------------
     */
    'title'     => 'ログイン履歴一覧',
    'head_list' => 'ログイン履歴一覧',
    'head_exercise' => '総合演習履歴一覧',
    'head_point' => 'ポイント取得履歴一覧',
    'head_form_search' => 'ポイント取得履歴',
    'title_history_point' => 'ポイント取得履歴一覧',

    // Label
    'lbl_user_id' => 'ユーザーID',
    'lbl_user_login' => 'ログインID',
    'lbl_name' => '氏名',
    'lbl_name_user' => 'ユーザー名',
    'lbl_table_point_datetime' => '取得日時',
    'lbl_table_point_user_id' => 'ユーザーID',
    'lbl_table_point_login_id' => 'ログインID',
    'lbl_table_point_username' => '氏名',
    'lbl_table_point_condition' => '取得条件',
    'lbl_table_point_sum_point' => 'ポイント残高',
    'lbl_table_point_dif_point' => 'ポイント増減値',
    'lbl_table_point_operation' => '操作',
    
    'lbl_item_type' => 'アイテム種別',
    'lbl_date_limit' => '取得日時',
    
    'lbl_item_name' => '入力項目名',
    'lbl_group' => 'グループ',
    'lbl_state' => '状態',
    'lbl_profile' => 'プロフィール',
    'lbl_type' => '種別',
    'lbl_project' => '項目',
    'lbl_postal_code' => '郵便番号',
    'lbl_prefectures' => '都道府県',
    'lbl_gender' => '性別',
    'head_search_result' => '検索結果',
    'lbl_sort' => 'ソート順',
    'lbl_user_username' => 'ユーザー表示名',
    'lbl_login_date' => 'ログイン日時',
    'lbl_state' => '状態',
    'lbl_login_date_and_time' => 'ログイン日時',
    
    'head_drill' => 'ドリル正誤履歴',
    //Label
    'lbl_user_id' => 'ユーザーID',
    'lbl_time_login' => 'ログイン日時',
    'lbl_group_example' => '参加グループ',
    'lbl_studies' => '学生',
    'lbl_class' => 'クラス',
    'lbl_majors' => '志望分野',
    'lbl_university' => '大学種別',
    'lbl_location' => '所在地',
    'lbl_file' => 'プロフィール',
    'lbl_object_search' => '検索対象',
    'lbl_content_search' => '検索内容',
    'lbl_object_search_2' => '検索対象',
    'lbl_content_search_2' => '検索内容',
    'lbl_range' => '検索範囲',
    'lbl_drill' => '対象ドリル',
    'lbl_profile' => 'プロフィール',
    'lbl_search_obj' => '検索対象',
    'lbl_search_content' => '検索内容',
    'lbl_student_id' => '学生番号',
    'lbl_student_name' => '氏名',
    //Button
    'btn_filter' => '絞り込み',
    'btn_CSV_output' => 'CSV出力',
    'btn_add' => '追加',
    'btn_search' => '検索',
    'btn_edit_getted_point' => '編集',
    
    // view input
    'lbl_select_sg' => '選択してください',
    'lbl_select_mp' => '選択してください',
    'lbl_year' => '年',
    'lbl_month' => '月',
    'lbl_day' => '日',
    
    
    
    /**
     * History drill
     */
    'drill' => [
        'title'     => 'ドリル正誤履歴一覧',
        'head_title'     => 'ドリル正誤履歴一覧',
        'head_select_drill' => 'ドリル選択',
        
        'lbl_date' => '実施日',
        'lbl_time_login' => 'ログイン日時',
        'lbl_group' => '参加グループ',
        'lbl_type'  => '種別',
        'lbl_choose_group'  => '項目',
        'lbl_chosen_drill'  => '対象ドリル',
        'lbl_student_id' => 'ユーザーID',
        'lbl_student_name'  => '氏名',
        
        'btn_choose_drill'  => 'ドリル選択',
        'btn_confirm'       => '確定',
        'start_drill'       => '未選択',
        'right_answer'      => '○',
        'wrong_answer'      => 'ｘ',
        'pending_answer'    => '△',
        'stop_answer'       => 'パス',
        'null_answer'       => '中断',
        'empty_answer'      => 'ー',
        'CODE_MODULE_DRILL' => 'ドリル正誤履歴機能を有効にしてください。',
        'CODE_ROLE_DRILL' => '操作権限がありません。'
    ],
    
    'exercise' => [
        'head_id_history' => '履歴ID',
        'head_user_id' => 'ユーザーID',
        'head_login_id' => 'ログインID',
        'head_user_name' => 'ユーザー名',
        'head_content_type' => 'アイテム種別',
        'head_drill_type' => 'ドリル種別',
        'head_item_id' => 'アイテムID',
        'head_item_name' => 'アイテム名',
        'head_item_sub_name' => 'サブアイテム名',
        'head_item_status' => 'ステータス',
        'head_drill_pass' => '合否',
        'head_progress' => '進捗',
        'head_result' => '成績',
        'head_learning_start_time' => '学習開始日時',
        'head_drill_start_date' => 'ドリル実施開始日時',
        'head_learning_end_time' => '学習完了日時',
        'head_history_updated_at' => '履歴更新日時',
        'head_goal_score' => 'テスト目標得点',
        'head_reputation_score' => '自己評価点',
        'head_reputation_comment' => '振り返りコメント',
        
        'head_end_learning_updated' => '履歴<br>更新日時',
        'head_end_learning_show' => '履歴<br>反映日時',
        
        'txt_item_type_drill' => 'ドリル',
        'txt_item_type_test' => 'テスト',
        'txt_item_type_report' => '添削レポート',
        'txt_item_type_video' => 'ビデオ',
        'txt_item_type_document' => 'ドキュメント',
        'txt_item_type_link' => 'リンク',
        'txt_item_type_twoway' => '双方向ライブ',
        
        'txt_item_status_interrupted' => '中断',
        'txt_item_status_completed' => '完了',
        'txt_item_status_sent' => '提出済み',
        'txt_item_status_approved' => '承認済',
        
        'txt_result_correct_answer' => ":result問正解",
        'txt_result_percent' => ":result%",
        'txt_result_point' => ":result点",
        
        'txt_drill_pass_failed' => '不合格',
        'txt_drill_pass_passed' => '合格',
        'txt_drill_pass_passed_submit' => '再提出後合格',
        'txt_drill_pass_null' => '未設定',
        
        
        'txt_result_search' => '検索結果',
        'txt_result_in' => '件中',
        'txt_result_display' => '件表示',
        
        'lbl_ending_learning' => '履歴更新日時',
        'lbl_explain_search_val' => '完全一致',
        'lbl_explain_search_like' => '部分一致',
        
        'message_error_dateformat' => '履歴更新日時の形式が不正です。'
            
    ],
    /**
     * -------------------------------------------------------------------------
     * Error Page
     * -------------------------------------------------------------------------
    */
    'page_not_exist'    => 'ページが存在しません。',
    'not_page_display'  => '画面の表示に失敗しました。',
    'error_policy' => '操作権限がありません。'
];
