const express = require('express')
const router = express.Router()
const appController = require('../controllers/appController.js')

// Application Routes
router.get('/', appController.home)
router.get('/dependencies', appController.dependencies)
router.get('/minimumSecure', appController.minimumSecurePage)
router.get('/latestReleases', appController.latestReleasesPage)

// API Routes
router.get('/api/minimum-secure', appController.minimumSecure)
router.get('/api/latest-releases', appController.latestReleases)

module.exports = router
