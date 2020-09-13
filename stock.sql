CREATE TABLE `stock-record`.`stock_config`(
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
        `stock_code` VARCHAR(250) NOT NULL COMMENT '股票代码',
        `stock_type` VARCHAR(250) NOT NULL COMMENT '股票交易所(SH/SZ)',
        `rise_percent` VARCHAR(250) NOT NULL COMMENT '涨幅通知阶段，0-10,多阶段用,分割',
        `fall_percent` VARCHAR(250) NOT NULL COMMENT '下跌通知阶段',
        `stock_enable` INT NOT NULL COMMENT '是否启用',
        'mobile' VARCHAR(250) NOT NULL COMMENT '通知人手机号',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY ( id )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='股票涨跌幅记录';
CREATE TABLE `stock-record`.`stock_notify`(
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
        `stock_code` VARCHAR(250) NOT NULL COMMENT '股票代码',
        `stock_type` VARCHAR(250) NOT NULL COMMENT '股票交易所(SH/SZ)',
        `trigger_percent` VARCHAR(250) NOT NULL COMMENT '通知时的涨跌幅',
        `repeat` INT NOT NULL COMMENT '是否重新通知',
        `record_time` VARCHAR(250) NOT NULL COMMENT '通知日期（日）',
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
        PRIMARY KEY ( id )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='钉钉通知记录';