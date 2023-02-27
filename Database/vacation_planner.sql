-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2023 at 03:51 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_planner`
--
CREATE DATABASE IF NOT EXISTS `vacation_planner` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation_planner`;

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `following`
--

INSERT INTO `following` (`userId`, `vacationId`) VALUES
(7, 9),
(7, 11),
(7, 13),
(7, 14),
(7, 16),
(7, 17),
(7, 19),
(8, 9),
(8, 11),
(8, 12),
(8, 13),
(8, 14),
(8, 15),
(8, 17),
(8, 18);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(5, 'admin', '', 'admin@gmail.com', '1fd495b22b55b313a881035c7e2691fa459ffa27da98c5e124d57cf9b68635dd5d0a7ba7d0137eb0079d8e7bad984776f1db8f0036b959bbca58ba0c7311f082', 'Admin'),
(7, 'Nate', 'Stahlberg', 'nate@gmail.com', '2e6a4d846e23b9721b7dc52743e3c36a7aa69ca5568fa09b53701853e3ce7b853765c90497e5b6a48b6636d0d051f3cec76a1fd77acf2583a4f61f47e44f93fc', 'User'),
(8, 'Nete', 'games', 'nategames15@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(9, 'Bali, Indonesia', 'Bali is a tropical paradise known for its lush jungles, vibrant culture, and pristine beaches. Explore the ancient temples, relax in a traditional Balinese spa, and experience the local cuisine.', '2023-03-10', '2023-03-17', '2500.00', 'ff9d1611-5bb5-476a-acd0-f1b6a765db8c.jpg'),
(10, 'Venice, Italy', 'Venice is a charming city built on water, known for its historic canals, stunning architecture, and delicious food. Explore the iconic St. Mark\'s Square, take a gondola ride, and sample the local seafood.', '2023-07-20', '2023-07-27', '3000.00', 'fb6ecb6f-7fbd-4bd2-a508-12b82671fb37.jpg'),
(11, 'Cancun, Mexico', 'Cancun is a lively resort town known for its pristine beaches, turquoise waters, and vibrant nightlife. Relax on the beach, snorkel in the coral reefs, and party the night away.', '2023-11-15', '2023-11-22', '1800.00', 'affa4194-09b8-4055-a3b5-d7059e52f043.jpg'),
(12, 'Honolulu, Hawaii', 'Honolulu is the capital of Hawaii and a hub for beach lovers, surfers, and adventurers. Soak up the sun on Waikiki Beach, hike Diamond Head, and experience Hawaiian culture.', '2023-04-05', '2023-04-12', '3500.00', 'b9858b79-2f32-4773-aa35-98eebab2598e.jpg'),
(13, 'Paris, France', 'Paris is the city of love, known for its iconic landmarks, world-class cuisine, and rich cultural heritage. Explore the Eiffel Tower, stroll along the Seine, and sample the local pastries.', '2023-08-10', '2023-08-17', '3200.00', 'd1ae6b0a-dcba-4992-a854-f43b265fe039.jpg'),
(14, 'Amsterdam, Netherlands', 'Amsterdam is a charming city known for its vibrant culture, historic canals, and world-famous museums. Explore the Van Gogh Museum, take a bike tour, and sample the local cheese.', '2023-12-15', '2023-12-22', '2700.00', 'f3bba325-88bc-46ae-a189-60a3012a6a5b.jpg'),
(15, 'Rio de Janeiro, Brazil', 'Rio de Janeiro is a lively city known for its stunning beaches, vibrant nightlife, and iconic landmarks. Relax on Copacabana Beach, visit Christ the Redeemer, and sample the local cuisine.', '2024-01-10', '2024-01-17', '2300.00', '71b35329-4e66-4460-ba8b-9718fefeef8a.jpg'),
(16, 'Maui, Hawaii', 'Maui is an idyllic Hawaiian island with beautiful beaches, vibrant culture, and breathtaking natural beauty. Hike through lush jungles, watch the sunrise from the top of Haleakala, and learn about Hawaiian history and traditions.', '2023-07-15', '2023-07-22', '3000.00', '14618c0c-372e-4e05-aa5a-c3103efb98ce.jpg'),
(17, 'Phuket, Thailand', 'Phuket is a tropical island in Thailand with stunning beaches, lush jungles, and rich culture. Snorkel in the Andaman Sea, explore ancient temples, and indulge in local cuisine.', '2023-08-01', '2023-08-01', '2500.00', '05c8df0c-ec8f-4c06-9760-b4ce639841e3.jpg'),
(18, 'New York City, USA', 'New York City is a bustling metropolis with a rich cultural heritage, world-class museums, and iconic landmarks. Explore Central Park, visit the Metropolitan Museum of Art, and catch a Broadway show.', '2023-12-01', '2023-12-01', '2500.00', '974cf369-10d1-4c56-a036-ca55395664d5.jpg'),
(19, 'Barcelona, Spain', 'Barcelona is a city of art, architecture, and history, with stunning buildings, museums, and beaches. Visit the Sagrada Familia, stroll along La Rambla, and relax on the Barceloneta Beach.', '2024-05-01', '2024-05-01', '2500.00', '5980d01f-afe1-49a7-824a-84d2a1753d6c.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `following`
--
ALTER TABLE `following`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `following`
--
ALTER TABLE `following`
  ADD CONSTRAINT `following_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `following_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
