<?php declare(strict_types=1);

namespace Sec\Subscriber;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityWrittenEvent;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CmsBlockWrittenSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly Connection $connection)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            'cms_block.written' => 'onCmsBlockWritten',
        ];
    }

    public function onCmsBlockWritten(EntityWrittenEvent $event): void
    {
        foreach ($event->getIds() as $id) {
            if (!is_string($id) || !Uuid::isValid($id)) {
                continue;
            }

            $this->connection->executeStatement(
                <<<'SQL'
                    UPDATE `cms_block`
                    SET
                        `margin_top` = NULL,
                        `margin_right` = NULL,
                        `margin_bottom` = NULL,
                        `margin_left` = NULL
                    WHERE `id` = :id
                SQL,
                [
                    'id' => Uuid::fromHexToBytes($id),
                ]
            );
        }
    }
}
