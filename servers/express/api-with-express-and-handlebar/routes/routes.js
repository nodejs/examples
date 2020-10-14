const express = require('express')
const router = express.Router()
const appController = require('../controllers/appController.js')

// Application Routes
router.get('/', appController.home)
router.get('/dependencies', appController.dependencies)
router.get('/minimumSecure', appController.minimumSecurePage)
router.get('/latestReleases', appController.latestReleasesPage)

// API Routes
router.get('/minimum-secure', appController.minimumSecure)
router.get('/latest-releases', appController.latestReleases)

module.exports = router
