<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace App\Repositories;

use App\Repositories\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;

abstract class EloquentRepository implements RepositoryInterface{

    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $_model;

    /**
     * EloquentRepository constructor.
     */
    public function __construct()
    {
        $this->setModel();
    }

    /**
     * get model
     * @return string
     */
    abstract public function getModel();

    /**
     * Set model
     */
    public function setModel()
    {
        $model = app()->make(
            $this->getModel()
        );

        if (!$model instanceof Model) {
            throw new \Exception('Model must be instanceof Illuminate\Database\Eloquent\Model');
        }

        $this->_model = $model;
    }

    /**
     * Get All
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {
        return $this->_model->all();
    }

    /**
     * Get one
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        $result = $this->_model->find($id);
        return $result;
    }

    /**
     * Create
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes)
    {
        return $this->_model->create($attributes);
    }

    /**
     * Update
     * @param $id
     * @param array $attributes
     * @return bool|mixed
     */
    public function update($id, array $attributes)
    {
        $result = $this->find($id);
        if($result) {
            $result->update($attributes);
            return $result;
        }
        return false;
    }

    /**
     * Delete
     *
     * @param $id
     * @return bool
     */
    public function delete($id)
    {
        $result = $this->find($id);
        if($result) {
            $result->delete();
            return true;
        }

        return false;
    }

    /**
     * Lock
     *
     * @param $id
     * @return bool
     */
    public function lock($id)
    {
        $result = $this->find($id);
        if($result) {
            if($result->active == 1)
            {
                $result->active = 0;
            }else{
                $result->active = 1;
            }

            $result->save();
            return true;
        }

        return false;
    }
}
