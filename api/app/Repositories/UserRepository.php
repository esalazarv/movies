<?php


namespace App\Repositories;


use App\Models\User;

class UserRepository extends Repository
{

    /**
     * @inheritDoc
     */
    public function getModel()
    {
        return new User;
    }

    public function findByEmail(string $email)
    {
        return $this->getModel()->where('email', $email)->first();
    }
}
