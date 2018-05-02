<?php

namespace App\Repositories\User;

use App\Repositories\EloquentRepository;
use App\Repositories\User\UserRepositoryInterface;

class UserEloquentRepository extends EloquentRepository implements UserRepositoryInterface
{
    /**
     * Set model user for interface
     * 
     * @return \App\Models\User $user
     */
    public function getModel(){
        return \App\Models\User::class;
    }
    
    /**
     * Get all posts only published
     * @return mixed
     */
    public function getAllPublished()
    {
        $result = $this->model->where('is_published', 1)->get();
        
        return $result;
    }
 
    /**
     * Get post only published
     * @param $id int Post ID
     * @return mixed
     */
    public function findOnlyPublished($id)
    {
        $result = $this
            ->model
            ->where('id', $id)
            ->where('is_published', 1)
            ->first();
            
        return $result;
    }
}
