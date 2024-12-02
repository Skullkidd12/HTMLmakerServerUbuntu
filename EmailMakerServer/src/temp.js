let lineColor = '#EFEFEF';
switch (content[0]) {
  case 'coop_header_super'||'coop_header_super_site':
    lineColor = '#FA6e50'
    break;
  case 'coop_header_droga'||'coop_header_droga_site':
    lineColor = '#3cc86e'
    break;
  case 'coop_header_atacarejo'||'coop_header_institucional':
    lineColor = '#C83C46'
    break;
    case 'coop_header_emporio':
    lineColor = '#ADA08A'
    break;
  default:
    lineColor = '#efefef'
    break;
}