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

        if ($entity_type === "ServiceSection") {
            return \App\Models\OP\ServiceSection::find($entity_id);
        }

        if ($entity_type === "NotificationCategory") {
            return \App\Models\OP\NotificationCategory::find($entity_id);
        }


        if ($entity_type === "Blog") {
            return \App\Models\OP\Blog::find($entity_id);
        }

        if ($entity_type === "BlogCategory") {
            return \App\Models\OP\BlogCategory::find($entity_id);
        }

        return null;
    }
}
