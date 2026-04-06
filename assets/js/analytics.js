/* ----- VISITOR ANALYTICS TRACKING ----- */

// Initialize analytics
(function() {
    'use strict';
    
    const analyticsKey = 'vivek_portfolio_2026';
    
    // Get visitor info
    function getVisitorInfo() {
        return {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || 'direct',
            page: window.location.href,
            screen: {
                width: window.screen.width,
                height: window.screen.height
            }
        };
    }
    
    // Get IP address using free API
    function trackVisitor() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const visitorInfo = getVisitorInfo();
                visitorInfo.ip = data.ip;
                
                // Store in localStorage
                storeVisitorInfo(visitorInfo);
                
                // Optional: Send to server if backend available
                // sendAnalyticsToServer(visitorInfo);
            })
            .catch(error => {
                console.log('Analytics tracking: IP fetch failed', error);
                // Continue without IP if service unavailable
                const visitorInfo = getVisitorInfo();
                storeVisitorInfo(visitorInfo);
            });
    }
    
    // Store visitor data locally
    function storeVisitorInfo(info) {
        try {
            let visitors = JSON.parse(localStorage.getItem(analyticsKey) || '[]');
            visitors.push(info);
            
            // Keep only last 100 visitors to prevent storage overflow
            if (visitors.length > 100) {
                visitors = visitors.slice(-100);
            }
            
            localStorage.setItem(analyticsKey, JSON.stringify(visitors));
            
            // Update visitor count display if element exists
            updateVisitorDisplay(visitors.length);
        } catch (e) {
            console.log('Analytics storage error:', e);
        }
    }
    
    // Update visitor count in UI
    function updateVisitorDisplay(count) {
        const element = document.getElementById('visitor-count');
        if (element) {
            element.textContent = count;
        }
    }
    
    // Get analytics summary
    window.getAnalyticsSummary = function() {
        try {
            const visitors = JSON.parse(localStorage.getItem(analyticsKey) || '[]');
            const summary = {
                totalVisitors: visitors.length,
                visitors: visitors,
                uniqueIPs: getUniqueIPs(visitors),
                topReferrers: getTopReferrers(visitors),
                browsers: getBrowserStats(visitors)
            };
            
            // Print to console
            console.clear();
            console.log('%c=== PORTFOLIO ANALYTICS ===', 'color: #1e9fab; font-size: 16px; font-weight: bold;');
            console.log('%cTotal Visitors: ' + summary.totalVisitors, 'color: #00B5E7; font-size: 14px;');
            console.log('%cUnique IPs: ' + summary.uniqueIPs.length, 'color: #1e9fab; font-size: 12px;');
            console.table(summary.visitors.slice(-10));
            console.log('%cTop Referrers:', 'color: #1e9fab; font-weight: bold;');
            console.table(summary.topReferrers);
            console.log('%cBrowser Statistics:', 'color: #1e9fab; font-weight: bold;');
            console.table(summary.browsers);
            
            return summary;
        } catch (e) {
            console.log('Error getting summary:', e);
            return null;
        }
    };
    
    // Keyboard shortcut: Press Ctrl+Shift+A to view analytics
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 65) { // Ctrl+Shift+A
            window.getAnalyticsSummary();
        }
    });
    
    // Helper functions
    function getUniqueIPs(visitors) {
        const ips = new Set();
        visitors.forEach(v => {
            if (v.ip) ips.add(v.ip);
        });
        return Array.from(ips);
    }
    
    function getTopReferrers(visitors) {
        const referrers = {};
        visitors.forEach(v => {
            referrers[v.referrer] = (referrers[v.referrer] || 0) + 1;
        });
        return Object.entries(referrers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }
    
    function getBrowserStats(visitors) {
        const browsers = {};
        visitors.forEach(v => {
            let browser = 'Unknown';
            if (v.userAgent.includes('Chrome')) browser = 'Chrome';
            else if (v.userAgent.includes('Firefox')) browser = 'Firefox';
            else if (v.userAgent.includes('Safari')) browser = 'Safari';
            else if (v.userAgent.includes('Edge')) browser = 'Edge';
            
            browsers[browser] = (browsers[browser] || 0) + 1;
        });
        return browsers;
    }
    
    // Track page view when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackVisitor);
    } else {
        trackVisitor();
    }
})();
