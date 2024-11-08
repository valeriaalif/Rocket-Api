class TechAcademy {
  constructor(id, userId, courseId, academicDegree, children, birthDate, province, district, area,organization, englishLevel) {
    (this.id = id),
      (this.userId = userId),
      (this.courseId = courseId),
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