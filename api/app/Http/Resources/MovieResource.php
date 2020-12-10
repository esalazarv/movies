<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "active" => $this->active,
            "publish_date" => $this->publish_date,
            "created_at" => $this->created_at,
            "updated_at"=> $this->updated_at,
        ];
    }
}
