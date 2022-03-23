import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
    paddingTop: 20,
    margin: 0
  },

  profileText: {
    padding: 0,
    margin: 0,
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
    paddingRight: 20
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
    flexGrow: 1
  },

  workRow: {
    padding: 0,
    margin: 0
  },

  workHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 5,
    margin: 0
  },

  workNotes: {
    fontSize: 9,
    display: 'flex',
    flexDirection: 'column'
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
});


// Create Document Component
const PdfResume = props => (
  <Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.horizontalWrapper}>

        <View style={styles.mainColumn}>
          <View style={styles.headerRow}>
            <Text>{props.content.name}</Text>
            <Text>{props.content.number}</Text>
            <Text>{props.content.email}</Text>
          </View>

          <View style={styles.profile}>
            {props.content.profile.map(function(para) { return (<Text style={styles.profileText}>{para}</Text>); })}
          </View>
        </View>

        <View style={styles.skillsSection}>
          {props.content.SKILLS.
            sort(function(a, b) { return props.content.skillComparator(a, b, props.content.skillOrderings.indexOf('category')); }).
            map(skill => {
              return (
                <View style={styles.skillRow} key={skill.name}>
                  <Text> {skill.name} </Text>
                  <Text> {props.content.skillText(skill.skill)} </Text>
                </View>
              );
          })}
        </View>
      </View>

      <View style={styles.workSection}>
        {props.content.WORK.
          sort(function(a, b) { return props.content.profileComparator(a, b, 1); }).
          map(job => {
            if (job.skippable) { return null; }
            return (
              <View style={styles.workRow} key={job.title}>
                <View style={styles.workHeader}>
                  <Text style={styles.workTitle}> {job.title} - {job.job_title} </Text>
                  <Text style={styles.workDate}> {job.start_date} - {job.end_date} </Text>
                </View>
                <View style={styles.workNotes}>
                  {job.notes.map(note => (<Text style={styles.workNote}> {note} </Text>))}
                </View>
              </View>
            );
        })}
      </View>

      <Text style={styles.footerRow}> see {props.content.link} for full resume </Text>

    </Page>
  </Document>
);

PdfResume.propTypes = {
  content: PropTypes.object
};

export default PdfResume;
