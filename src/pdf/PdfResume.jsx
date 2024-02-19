import React from 'react'
import PropTypes from 'prop-types'
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer'

import { EventList } from '../js/lists/EventList'
import { SkillList } from '../js/lists/SkillList'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    fontSize: 11,
    padding: 50,
    height: '100%',
    position: 'relative'
  },

  section: {
  },

  profile: {
    paddingTop: 10,
    margin: 0
  },

  profileText: {
    padding: 0,
    margin: 0
  },

  headerRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  horizontalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },

  mainColumn: {
    width: '80%',
    flexGrow: 1,
    paddingRight: 10
  },

  skillsSection: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column'
  },

  skillRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  workSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    paddingTop: 5,
    marginLeft: -3
  },

  workRow: {
    padding: 0,
    margin: 0
  },

  workHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 1,
    margin: 0
  },

  workSkillRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: -2,
    paddingBottom: 2
  },

  workBody: {
    fontSize: 9,
    paddingLeft: 3
  },

  workNote: {
    paddingBottom: 2
  },

  footerRow: {
    width: '100%',
    position: 'fixed',
    bottom: -20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 11
  }
})

// Create Document Component
const PdfResume = props => (
  <Document>
    <Page size='A4' style={styles.page}>

      <View style={styles.horizontalWrapper}>

        <View style={styles.mainColumn}>
          <View style={styles.headerRow}>
            <Text>{props.content.PROFILE.name}</Text>
            <Text>{props.content.PROFILE.number}</Text>
            <Text>{props.content.PROFILE.email}</Text>
          </View>

          <View style={styles.profile}>
            <Text style={styles.profileText}>
              {props.content.PROFILE.profile}
            </Text>
          </View>
        </View>

        <View style={styles.skillsSection}>
          {props.content.SKILLS
            .sort(function (a, b) { return SkillList.skillComparator(a, b, SkillList.skillOrderings.indexOf('category')) })
            .map(skill => {
              if (skill.skippable) {
                return null
              }
              return (
                <View style={styles.skillRow} key={skill.name}>
                  <Text> {skill.name} </Text>
                  <Text> {SkillList.skillText(skill.skill)} </Text>
                </View>
              )
            })}
        </View>
      </View>

      <View style={styles.workSection}>
        {props.content.WORK
          .sort(function (a, b) { return EventList.eventComparator(a, b, 1) })
          .map(job => {
            if (job.skippable) { return null }
            return (
              <View style={styles.workRow} key={job.title}>
                <View style={styles.workHeader}>
                  <Text style={styles.workTitle}> {job.title} - {job.job_title} </Text>
                  <Text style={styles.workDate}> ({job.start_date} - {job.end_date}) </Text>
                </View>
                <View style={styles.workBody}>
                  <View style={styles.workSkillRow}>
                    {job.skills.map((skill) => {
                      return <Text style={styles.workSkill} key={skill}> {skill} </Text>
                    })}
                  </View>
                  <Text style={styles.workNote}>{job.notes}</Text>
                </View>
              </View>
            )
          })}
      </View>

      <Text style={styles.footerRow}> see <Link src={props.content.PROFILE.link}>{props.content.PROFILE.link}</Link> for full resume </Text>

    </Page>
  </Document>
)

PdfResume.propTypes = {
  content: PropTypes.object
}

export default PdfResume
