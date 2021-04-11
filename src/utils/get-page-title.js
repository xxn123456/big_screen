import defaultSettings from '@/settings'

const title = defaultSettings.title || '管理者门户'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
