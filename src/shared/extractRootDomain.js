export default (domain = location.hostname) => /^([\d.]+|[a-z-]+)$/.test(domain) ? domain : domain.split('.').slice(-2).join('.')
