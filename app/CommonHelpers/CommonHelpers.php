<?php

namespace App\CommonHelpers;

use App\Models\OP\Service;

class CommonHelpers
{
    public static function checkEntityType($entity_type, $entity_id)
    {
        if ($entity_type === "Service") {
            return \App\Models\OP\Service::find($entity_id);
        }

        if ($entity_type === "ServiceCategory") {
            return \App\Models\OP\ServiceCategory::find($entity_id);
        }

        return null;
    }
}
