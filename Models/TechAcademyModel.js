class TechAcademy {
  constructor(id, userName, courseTitle, academicDegree, children, birthDate, province, district, area,organization, englishLevel) {
    (this.id = id),
      (this.userName = userName),
      (this.courseTitle = courseTitle),
      (this.academicDegree = academicDegree),
      (this.children = children),
      (this.birthDate = birthDate),
      (this.province = province),
      (this.district = district),
      (this.area = area),
      (this.organization = organization),
      (this.englishLevel = englishLevel)
  }
}

module.exports = TechAcademy;