<?php declare(strict_types=1);

namespace Sec\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1784831400RemoveExistingCmsBlockMargins extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1784831400;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement(
            <<<'SQL'
                UPDATE `cms_block`
                SET
                    `margin_top` = NULL,
                    `margin_right` = NULL,
                    `margin_bottom` = NULL,
                    `margin_left` = NULL
                WHERE
                    `margin_top` IS NOT NULL
                    OR `margin_right` IS NOT NULL
                    OR `margin_bottom` IS NOT NULL
                    OR `margin_left` IS NOT NULL
            SQL
        );
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
