<?php

namespace App\CommonHelpers;

use App\Models\OP\Service;

class CommonHelpers
{
    public static function checkEntityType($entity_type, $entity_id)
    {
        if ($entity_type === "service") {
            return Service::find($entity_id);
        }

        return null;
    }
}
