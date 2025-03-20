-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/03/2025 às 16:13
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `email_system`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `email_messages`
--

CREATE TABLE `email_messages` (
  `id` int(11) NOT NULL,
  `thread_id` int(11) NOT NULL,
  `message_id` varchar(255) NOT NULL,
  `from_email` varchar(255) NOT NULL,
  `to_email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `is_sent` tinyint(1) DEFAULT 0,
  `sent_at` timestamp NULL DEFAULT NULL,
  `received_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `email_threads`
--

CREATE TABLE `email_threads` (
  `id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `last_message_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `smtp_configurations`
--

CREATE TABLE `smtp_configurations` (
  `id` int(11) NOT NULL,
  `host` varchar(255) NOT NULL,
  `port` int(11) NOT NULL,
  `secure` tinyint(1) DEFAULT 1,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `smtp_configurations`
--

INSERT INTO `smtp_configurations` (`id`, `host`, `port`, `secure`, `user`, `password`, `created_at`, `updated_at`) VALUES
(1, 'smtp.gmail.com', 587, 1, 'lucas@asd.com', 'laskdas', '2025-03-20 15:10:51', '2025-03-20 15:10:51'),
(2, 'smtp.gmail.com', 587, 1, 'lucasmvlog3@gmail.com', 'Violino@123', '2025-03-20 15:11:00', '2025-03-20 15:11:00'),
(3, 'smtp.gmail.com', 587, 1, 'lucasmvlog3@gmail.com', 'Lucas@Ana1', '2025-03-20 15:11:03', '2025-03-20 15:11:03');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `email_messages`
--
ALTER TABLE `email_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email_messages_thread_id` (`thread_id`),
  ADD KEY `idx_email_messages_message_id` (`message_id`);

--
-- Índices de tabela `email_threads`
--
ALTER TABLE `email_threads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email_threads_last_message` (`last_message_at`);

--
-- Índices de tabela `smtp_configurations`
--
ALTER TABLE `smtp_configurations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `email_messages`
--
ALTER TABLE `email_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `email_threads`
--
ALTER TABLE `email_threads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `smtp_configurations`
--
ALTER TABLE `smtp_configurations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `email_messages`
--
ALTER TABLE `email_messages`
  ADD CONSTRAINT `email_messages_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `email_threads` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
